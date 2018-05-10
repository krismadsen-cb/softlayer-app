import datetime

columnMapping = {
    'datacenter_name': 'datacenter',
    'typeId': 'NA',
    'domain': 'NA',
    'topLevelLocation_name': 'datacenter',
    'modifyDate': 'NA',
    'networkManagementIpAddress': 'networkManagementIpAddress',
    'consoleIpAddressRecord_ipAddress_ipAddress': 'networkManagementIpAddress',
    'consoleIpAddressRecord_ipAddress_port': 'networkManagementIpPort',
    'maxMemory': 'memory',
    'sshKeyCount': 'NA',
    'networkMonitorCount': 'NA',
    'primaryIpAddress': 'publicIp',
    'privateNetworkOnlyFlag': 'NA',
    'hardwareStatus_status': 'status',
    'memoryCapacity': 'memory',
    'id': 'NA',
    'accountId': 'NA',
    'datacenterName': 'NA',
    'fullyQualifiedDomainName': 'fqdn',
    'softwareComponentCount': 'NA',
    'location_name': 'NA',
    'maxCpu': 'cores',
    'activeTransactionCount': 'NA',
    'createDate': 'provisionDate',
    'hostname': 'NA',
    'hardwareStatusId': 'NA',
    'recentEventCount': 'NA',
    'inboundBandwidthUsage': 'NA',
    'rack_name': 'NA',
    'powerState_keyName': 'NA',
    'processorCoreAmount': 'NA',
    'inboundPublicBandwidthUsage': 'NA',
    'type': 'NA',
    'memoryCount': 'NA',
    'outboundBandwidthUsage': 'NA',
    'outboundPublicBandwidthUsage': 'NA',
    'networkVlanCount': 'NA',
    'networkVlans_0_name': 'vlan0_name',
    'networkVlans_0_vlanNumber': 'vlan0_number',
    'networkVlans_1_name': 'vlan1_name',
    'networkVlans_1_vlanNumber': 'vlan1_number',
    'networkVlans_2_name': 'vlan2_name',
    'networkVlans_2_vlanNumber': 'vlan2_number',
    'locationPathString': 'locationPath',
    'location_pathString': 'locationPath',
    'regionalGroup_name': 'NA',
    'monitoringServiceFlag': 'NA',
    'hardDriveCount': 'NA',
    'powerSupplyCount': 'NA',
    'networkCardCount': 'NA',
    'raidControllerCount': 'NA',
    'serialNumber': 'NA',
    'status_keyName': 'status',
    'hourlyBillingFlag': 'NA',
    'provisionDate': 'provisionDate',
    'monitoringAgentCount': 'NA',
    'primaryBackendIpAddress': 'ip',
    'notes': 'NA',
    'managedResourceFlag': 'NA',
    'processorCount': 'NA',
    'processorPhysicalCoreAmount': 'cores',
    'operatingSystemReferenceCode': 'NA',
    'operatingSystem_softwareLicense_softwareDescription_name': 'os',
    'networkComponentCount': 'NA',
    'serverRoom_name': 'pod',
    'sparePoolBillingItem_hostName': 'spare_hostname',
    'networkMonitorIncidentCount': 'NA',
    'activeNetworkMonitorIncidentCount': 'NA',
    'activeTicketCount': 'NA',
    'tagReferenceCount': 'NA',
    'networkGatewayMember_networkGateway_name': 'gateway'
    }

detailMaskBms = "mask[accountId,domain,fullyQualifiedDomainName,hardwareStatusId,hostname,id,notes,provisionDate,networkGatewayMember[networkGateway[name]],serialNumber,datacenterName,hardDriveCount,hardwareStatus[status],hourlyBillingFlag,inboundBandwidthUsage,inboundPublicBandwidthUsage,location[name],locationPathString,managedResourceFlag,memoryCapacity,memoryCount,monitoringAgentCount,monitoringServiceFlag,networkMonitorCount,activeNetworkMonitorIncidentCount,networkMonitorIncidentCount,networkCardCount,networkComponentCount,networkManagementIpAddress,networkVlanCount,operatingSystemReferenceCode,operatingSystem[softwareLicense[softwareDescription[name]]],outboundBandwidthUsage,outboundPublicBandwidthUsage,pointOfPresenceLocation,powerSupplyCount,primaryBackendIpAddress,primaryIpAddress,processorCoreAmount,processorCount,processorPhysicalCoreAmount,rack[name],raidControllerCount,recentEventCount,serverRoom[name],softwareComponentCount,sparePoolBillingItem[hostName],sshKeyCount,tagReferenceCount,topLevelLocation[name],networkVlans[name],networkVlans[vlanNumber]]"

detailMaskVsi = "mask[id,accountId,createDate,domain,fullyQualifiedDomainName,hostname,maxCpu,maxMemory,modifyDate,notes,typeId,activeTicketCount,activeTransactionCount,consoleIpAddressRecord[ipAddress[ipAddress],port],datacenter[name],hourlyBillingFlag,inboundPrivateBandwidthUsage,inboundPublicBandwidthUsage,location[name],location[pathString],monitoringAgentCount,monitoringServiceFlag,networkMonitorCount,activeNetworkMonitorIncidentCount,networkMonitorIncidentCount,networkComponentCount,networkVlanCount,operatingSystemReferenceCode,operatingSystem[softwareLicense[softwareDescription[name]]],powerState[keyName],primaryBackendIpAddress,primaryIpAddress,privateNetworkOnlyFlag,recentEventCount,regionalGroup[name],serverRoom[name],softwareComponentCount,sshKeyCount,status[keyName],tagReferenceCount,type[keyName],networkVlans[name],networkVlans[vlanNumber]]"

ticketMask = "mask[id,accountId,title,createDate,status[name],lastEditDate,lastResponseDate]"


now = datetime.datetime.now()
now = now.strftime("%m/%d/%Y")
eventMask = "mask[endDate,id,modifyDate,notificationOccurrenceEventType[keyName],recoveryTime,startDate,statusCode[name],subject,summary]"
eventFilterEndDate = {"endDate": {"operation": "greaterThanDate", "options": [{"name": "date", "value": [now]}]}, "statusCode": {"keyName": {"operation": "in", "options":[{"name": "data", "value": ["ACTIVE", "PUBLISHED"]}]}}}
eventFilterNoEndDate = {"endDate": {"operation": 'is null'}, "statusCode": {"keyName": {"operation": "in", "options":[{"name": "data", "value": ["ACTIVE", "PUBLISHED"]}]}}}
