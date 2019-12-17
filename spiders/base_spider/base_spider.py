"""
    spider base class
"""
import json
from typing import List, Any

import redis
from pymongo import MongoClient

from settings import REIDS_CONFIG, MONGO_CONFIG


class BaseConn(object):
    """基础连接类
    """
    def __init__(self) -> None:
       self.redis = self.redis_engine
       self.mongo = self.mongo_engine

    @property
    def redis_engine(self) -> Any:
        return redis.Redis(
            host = getattr(REIDS_CONFIG, 'REDIS_HOST'),
            port = getattr(REIDS_CONFIG, 'REDIS_PORT')
        )
    
    @property
    def mongo_engine(self) -> Any:
        return MongoClient(
            getattr(MONGO_CONFIG, 'MONGODB_URI')
        )


class BaseSpider(BaseConn):
    """基础爬虫类
    """
    def __init__(self, urls: List, name: str) -> None:
        super(__class__, self).__init__()
        self.urls = urls
        self.name = name
        self.ret = list()
    
    def before_request(self):
        raise NotImplementedError

    def send_request(self):
        raise NotImplementedError

    def judge_charset(self, content):
        raise NotImplementedError

    def deal_response(self):
        raise NotImplementedError

    def throw_data(self, channel: str):
        self.redis.publish(channel, json.dumps(self.ret))

    def close_spider(self):
        raise NotImplementedError

    def __str__(self):
        return f'<spider-{self.name}>'


