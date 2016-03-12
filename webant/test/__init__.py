import unittest
from webant import create_app
from conf.defaults import get_def_conf
from elasticsearch import Elasticsearch


class WebantTestCase(unittest.TestCase):

    def setUp(self):
        self.conf = get_def_conf()
        self.conf['USERS_DATABASE'] = "sqlite:///:memory:"
        self.conf['PWD_ROUNDS'] = 1
        self.conf['TESTING'] = True
        self.conf['ES_INDEX_NAME'] = 'test_webant'
        self.wtc = create_app(self.conf).test_client()

    def tearDown(self):
        es = Elasticsearch()
        if es.indices.exists(self.conf['ES_INDEXNAME']):
            es.indices.delete(self.conf['ES_INDEXNAME'])
