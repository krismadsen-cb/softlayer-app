import requests

class Insight(object):

    def __init__(self,
                 baseurl,
                 password,
                 port,
                 username,
                 default_headers={},
                 default_queries={}):

        self.baseurl         = baseurl
        self.password        = password
        self.port            = port
        self.username        = username
        self.default_headers = default_headers
        self.default_queries = default_queries


    def get(self, endpoint, headers={}, queries={}):
        override_headers = self.default_headers
        override_headers.update(headers)
        override_queries = self.default_queries
        override_queries.update(queries)
        queries['size'] = queries.get('size', '500')
        req = requests.get('https://%s:%s/api/3/%s'%(self.baseurl, self.port, endpoint),
                            auth=requests.auth.HTTPBasicAuth(self.username, self.password),
                            params=queries,
                            verify=False)
        return req.json()

    def get_assets(self, headers={}, queries={}):
        return self.get('assets', headers, queries)

    def get_tags(self, id, headers={}, queries={}):
        return self.get('assets/%s/tags'%(id), headers, queries)
