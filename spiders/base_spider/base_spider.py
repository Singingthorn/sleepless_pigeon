"""
    spider base class
"""
import os
import json
import random
from typing import List, Any

import redis
from pymongo import MongoClient

from settings import USER_AGENT, REIDS_CONFIG, MONGO_CONFIG


class BaseConn(object):
    """Basic connection class
    """
    def __init__(self) -> None:
       self.redis = self.redis_engine
       self.mongo = self.mongo_engine

    @property
    def redis_engine(self) -> Any:
        return redis.Redis(
            host = getattr(REIDS_CONFIG, 'host'),
            port = getattr(REIDS_CONFIG, 'port')
        )
    
    @property
    def mongo_engine(self) -> Any:
        return MongoClient(
            getattr(MONGO_CONFIG, 'uri')
        )


class BaseSpider(BaseConn):
    """Basic spider class
    """
    def __init__(self, jobs: str, name: str, channel: str) -> None:
        super(__class__, self).__init__()
        self.jobs = json.loads(jobs)
        self.name = name
        self.headers = dict()
        self.channel = channel
    
    def before_request(self, **kwargs):
        """Ready headers before request

        :param kwargs: something in HTTP headers
        """
        for k, v in kwargs.items():
            self.headers.update({k: v})
        self.headers.update({
            'Usert-Agent': random.choice(USER_AGENT)
        })

    def send_request(self):
        raise NotImplementedError

    def judge_charset(self):
        raise NotImplementedError

    def deal_response(self):
        raise NotImplementedError

    def throw_data(self, items: List):
        self.redis.publish(self.channel, json.dumps(items))

    def close_spider(self):
        raise NotImplementedError

    def render_html(self):
        raise NotImplementedError

    def __str__(self):
        return f'<spider-{self.name}>'


