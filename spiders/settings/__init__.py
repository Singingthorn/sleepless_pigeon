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
    os.getenv('REDIS_HOST'),
    os.getenv('REDIS_PORT'),
)

# mongodb
MongoDB = namedtuple(
    'MongoDB',
    [
        'uri',
    ]
)

MONGO_CONFIG = MongoDB(
    os.getenv('MONGODB_URI'),
)






Cookie: _yapi_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgxLCJpYXQiOjE1NzU5NjY3MTQsImV4cCI6MTU3NjU3MTUxNH0.8laOVip0nsVzWpo2SzvGc-iIgiQ10Stn3GTU3V8tXFA; _yapi_uid=81; i=2|1:0|10:1576462938|1:i|116:eyJlbWFpbCI6ICJjYWlxaW5namluZ0BodW9iaS5jb20iLCAiZXhwaXJlZCI6IDE1NzY0OTE3MzguOTM1MzI2LCAibmFtZSI6ICJjYWlxaW5namluZyJ9|7186dac064f94bfaf142d7ec6eaa75655a0c711a2ef5ad297e2864f3be342e8c
Host: 172.26.80.188:2333
If-None-Match: "c284f9387dea75a52ef79933c2ae9062cd07a1bc"
Referer: http://172.26.80.188:2333/config/uid
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36

