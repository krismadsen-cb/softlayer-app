import insight
import os
import pymysql

# Class constructors
ih = insight.Insight(baseurl=os.environ['INSIGHT_ADDRESS'],
                          password=os.environ['INSIGHT_PASSWORD'],
                          port=os.environ['INSIGHT_PORT'],
                          username=os.environ['INSIGHT_USERNAME'])

conn = pymysql.connect(host=os.environ['DB_HOST'],
                       port=int(os.environ['DB_PORT']),
                       user=os.environ['DB_USER'],
                       passwd=os.environ['DB_PASS'],
                       db=os.environ['DB'],
                       autocommit=True)
cursor = conn.cursor()

# Function definitions
def stash(put, table):
    first = True
    values = []
    keyClause = ""
    valClause = ""
    for key in put.keys():
        if key == '':
            continue
        if first:
            keyClause += '`' + str(key) + '`'
            valClause += "%s"
            first = False
        else:
            keyClause += ", `" + str(key) + "`"
            valClause += ", %s"
        try:
            values.append(str(put[key]))
        except:
            values.append(put[key])
    cursor.execute("replace into `" + table + "` (" + keyClause + ") values(" + valClause + ")", values)

def get_tags(id):
    req = ih.get_tags(id)
    tags = ''
    for tagdef in req['resources']:
        tags += '%s, '%(tagdef['name'])
    return tags[:-2]

def parse_response(response):
    for asset in assets['resources']:
        if asset.get('id', '') != '':
            put = {}
            put['id'] = asset['id']
            put['rawRiskScore'] = asset.get('rawRiskScore', 0.0)
            put['assessedForPolicies'] = asset.get('assessedForPolicies', '')
            put['ip'] = asset.get('ip', '')
            put['hostName'] = asset.get('hostName', '')
            put['assessedForVulnerabilities'] = asset.get('assessedForVulnerabilities', '')
            put['os'] = asset.get('os', '')
            put['lastScan'] = asset.get('history', [{'date': ''}])[0].get('date')
            put['tags'] = get_tags(asset['id'])
            stash(put, 'ivm_assets')
        else:
            continue


# Script begins here
assets = ih.get_assets()
parse_response(assets)
pages = assets['page'].get('totalPages', 1)
for page in range(1, pages):
    todo = ih.get_assets(queries={'page': page})
    parse_response(todo)

conn.commit()
conn.close()
