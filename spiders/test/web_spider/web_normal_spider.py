import json
import unittest

from web_spider.web_normal_spider import WebNormalSpider
from settings import JOBS, REDIS_CHANNEL

class TestWebNormalSpider(unittest.TestCase):

    def test_send_request(self):
        jobs = json.dumps(JOBS)
        web_normal_spider = WebNormalSpider(
            jobs, 
            'normal_spider',
            getattr(REDIS_CHANNEL, 'web')
        )
        web_normal_spider.send_request()

