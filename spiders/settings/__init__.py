"""
    settings
"""
import os
from collections import namedtuple

# redis
Redis = namedtuple(
    'Redis',
    [
        'host',
        'port',
    ]
)

REIDS_CONFIG = Redis(
    host = os.getenv('REDIS_HOST'),
    port = os.getenv('REDIS_PORT'),
)

RedisChannel = namedtuple(
    'RedisChannel',
    [
        'web',
        'weixin',
        'weibo',
        'app',
    ]
)

REDIS_CHANNEL = RedisChannel(
    web = 'web',
    weixin = 'weixin',
    weibo = 'weibo',
    app = 'app',
)

# mongodb
MongoDB = namedtuple(
    'MongoDB',
    [
        'uri',
    ]
)

MONGO_CONFIG = MongoDB(
    uri = os.getenv('MONGODB_URI'),
)

JOBS = [
    {
        'source': '世界新闻网',
        'url': 'https://www.worldjournal.com/',
        'selector': '//ul[@class="posts-list"]//li//a'
    },{
        'source': '世界新闻网',
        'url': 'https://www.worldjournal.com/',
        'selector': '//ul[@class="posts-list"]//li//a'
    },{
        'source': '世界新闻网',
        'url': 'https://www.worldjournal.com/',
        'selector': '//ul[@class="posts-list"]//li//a'
    },{
        'source': '世界新闻网',
        'url': 'https://www.worldjournal.com/',
        'selector': '//ul[@class="posts-list"]//li//a'
    },{
        'source': '世界新闻网',
        'url': 'https://www.worldjournal.com/',
        'selector': '//ul[@class="posts-list"]//li//a'
    },{
        'source': '世界新闻网',
        'url': 'https://www.worldjournal.com/',
        'selector': '//ul[@class="posts-list"]//li//a'
    },{
        'source': '世界新闻网',
        'url': 'https://www.worldjournal.com/',
        'selector': '//ul[@class="posts-list"]//li//a'
    },{
        'source': '世界新闻网',
        'url': 'https://www.worldjournal.com/',
        'selector': '//ul[@class="posts-list"]//li//a'
    },{
        'source': '世界新闻网',
        'url': 'https://www.worldjournal.com/',
        'selector': '//ul[@class="posts-list"]//li//a'
    }
]

USER_AGENT = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel …) Gecko/20100101 Firefox/71.0'
]