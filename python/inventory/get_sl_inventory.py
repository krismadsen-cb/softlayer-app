import argparse
import json
import os
import pymysql
import SoftLayer

from flatten_json import flatten, unflatten, unflatten_list
from time import sleep

# local definitions

import config

columnMapping = config.columnMapping
detailMaskBms = config.detailMaskBms
detailMaskVsi = config.detailMaskVsi
ticketMask    = config.ticketMask

def columnMappingLookup(col):
    if col in columnMapping.keys():
        if columnMapping[col] == 'NA':
            return col
        else:
            return columnMapping[col]
    else:
        return ''

def extractKeys(info, keyMap=dict()):
    for key in info:
        mappedKey = columnMappingLookup(key)
        if mappedKey == '':
            continue
        if (key not in keyMap.keys()):
            # keyMap.add(key)
            if isinstance(info[key], int) or isinstance(info[key], long):
                keyMap[mappedKey] = 'int'
            elif isinstance(info[key], float) or isinstance(info[key], complex):
                keyMap[mappedKey] = 'real'
            elif isinstance(info[key], str):
                keyMap[mappedKey] = 'text'
            else:
                keyMap[mappedKey] = 'text'
    return keyMap

def generateInsertSql(info, table, values, doMap=True):
    first = True
    keyClause = ""
    valClause = ""
    for key in info.keys():
        if doMap:
            mappedKey = str(columnMappingLookup(key))
        else:
            mappedKey = key
        if mappedKey == '':
            continue
        if first:
            keyClause += '`' + str(mappedKey) + '`'
            valClause += "%s"
            first = False
        else:
            keyClause += ", `" + str(mappedKey) + "`"
            valClause += ", %s"
        try:
            values.append(str(info[key]))
        except:
            values.append(info[key])
    return "replace into `" + table + "` (" + keyClause + ") values(" + valClause + ")"

def calculateMonthlyFee(service, _id):
    # Billing item tree has depth 1, luckily
    billing_item = client[service].getBillingItem(id=_id)
    fmonthly_fee = float(billing_item['recurringFee'])
    billing_id = billing_item['id']
    billing_children = client['SoftLayer_Billing_Item'].getActiveChildren(id=billing_id)
    for child in billing_children:
        fmonthly_fee += float(child['recurringFee'])
    return "%.2f"%(fmonthly_fee)

def get_inventory(org):
    # Getting servers and vsis
    try:
        servers = accountClient.getHardware(mask=detailMaskBms)
        keys = dict()
        for server in servers:
            bmDetails = server
            try:
                monthly_fee = calculateMonthlyFee('SoftLayer_Hardware', server['id'])
            except:
                monthly_fee = 0.0
            bmDetails['type'] = 'BM'
            serverInfo = flatten(server)
            print serverInfo
            bmInfo = flatten(bmDetails)
            keys = extractKeys(bmInfo, keys)
            values = []
            insertSql = generateInsertSql(bmInfo, 'sl_servers', values)
            # print monthly_fee
            # print "%s" % (bmInfo)
            # print "%s" % (insertSql)
            cursor.execute(insertSql, values)
            cursor.execute("update `sl_servers` set `monthly_cost` = %s where `id` = %s", [monthly_fee, server['id']])
    except SoftLayer.SoftLayerAPIError as e:
        print("Error. %s" % e)
    try:
        vsis = accountClient.getVirtualGuests(mask=detailMaskVsi)
        keys = dict()
        for vsi in vsis:
            vmDetails = vsi
            try:
                monthly_fee = calculateMonthlyFee('SoftLayer_Virtual_Guest', vsi['id'])
            except:
                monthly_fee = ''
            vmDetails['type'] = 'VM'
            vsiInfo = flatten(vsi)
            vmInfo = flatten(vmDetails)
            keys = extractKeys(vmInfo, keys)
            values = []
            insertSql = generateInsertSql(vmInfo, 'sl_servers', values)
            cursor.execute(insertSql, values)
            cursor.execute("update `sl_servers` set `monthly_cost` = %s where `id` = %s", [monthly_fee, vsi['id']])
            print "%s" % (insertSql)
            print "%s" % (vmInfo)
    except SoftLayer.SoftLayerAPIError as e:
        print("Error. %s" % e)

def get_tickets():
    try:
        tickets = accountClient.getOpenTickets(mask=ticketMask)
        keys = dict()
        for ticket in tickets:
            ticInfo = flatten(ticket)
            keys = extractKeys(ticInfo, keys)
            values = []
            insertSql = generateInsertSql(ticInfo, 'sl_tickets', values, doMap=False)
            cursor.execute(insertSql, values)
    except SoftLayer.SoftLayerAPIError as e:
        print("Error. %s" % e)

def get_events():
    try:
        eventService = client['SoftLayer_Notification_Occurrence_Event']
        eventMask = config.eventMask
        eventFilterEndDate = config.eventFilterEndDate
        eventFilterNoEndDate = config.eventFilterNoEndDate
        resultEndDate = eventService.getAllObjects(mask=eventMask, filter=eventFilterEndDate)
        resultNoEndDate = eventService.getAllObjects(mask=eventMask, filter=eventFilterNoEndDate)
        for event in resultEndDate:
            eventInfo = flatten(event)
            keys = extractKeys(eventInfo)
            values = []
            insertSql = generateInsertSql(eventInfo, 'sl_events', values, doMap=False)
            cursor.execute(insertSql, values)
        for event in resultNoEndDate:
            eventInfo = flatten(event)
            keys = extractKeys(eventInfo)
            values = []
            insertSql = generateInsertSql(eventInfo, 'sl_events', values, doMap=False)
            cursor.execute(insertSql, values)
    except SoftLayer.SoftLayerAPIError as e:
        print("Error. %s" % e)

def get_subnets():
    try:
        subnets = accountClient.getSubnets()
        ipMask = config.ipMask
        for subnet in subnets:
            subnetInfo = flatten(subnet)
            keys = extractKeys(subnetInfo)
            values = []
            insertSql = generateInsertSql(subnetInfo, 'sl_subnets', values, doMap=False)
            cursor.execute(insertSql, values)
            ips = client['SoftLayer_Network_Subnet'].getIpAddresses(id=subnet['id'],mask=ipMask)
            for ip in ips:
                ipInfo = flatten(ip)
                keys = extractKeys(subnetInfo)
                values = []
                insertSql = generateInsertSql(ipInfo, 'sl_ips', values, doMap=False)
                cursor.execute(insertSql, values)
    except SoftLayer.SoftLayerAPIError as e:
        print("Error. %s" % e)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--sluser')
    parser.add_argument('--sltoken')
    args = parser.parse_args()
    client = SoftLayer.create_client_from_env(username=args.sluser,
                                              api_key=args.sltoken)
    accountClient = client['SoftLayer_Account']
    conn = pymysql.connect(host=os.environ['DB_HOST'],
                           port=int(os.environ['DB_PORT']),
                           user=os.environ['DB_USER'],
                           passwd=os.environ['DB_PASS'],
                           db=os.environ['DB'],
                           autocommit=True)
    cursor = conn.cursor()
    print "Get Softlayer Inventory"
    get_inventory("")
    get_tickets()
    get_events()
    get_subnets()
    conn.commit()
    conn.close()
    pass
