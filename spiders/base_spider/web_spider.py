"""
    web spider
"""
import json
import random
from typing import List, Any
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests

from .base_spider import BaseSpider
from ..settings import USER_AGENT


class WebSpider(BaseSpider):
    """basic web爬虫
    """
    def __init__(self, urls: List, name: str) -> None:
        super(__class__, self).__init__(urls, name)
        self.headers = {}
    
    def before_request(self, **kwargs):
        for k, v in kwargs.items():
            self.headers.update({k: v})
        self.headers.update({
            'Usert-Agent': random.choice(USER_AGENT)
        })

    def send_request(self):
        def load_url(self, url: str, timeout: int) -> bytes:
            resp = requests.get(
                    url, 
                    headers=self.headers,
                    timeout=timeout
                )
            return resp.content

        with ThreadPoolExecutor(max_workers=5) as executor:
            # 这个也能拿来当key呢？
            future_to_url = {executor.submit(load_url, url, 16): url for url in self.urls}
            for future in as_completed(future_to_url):
                url = future_to_url[future]
                try:
                    self.judge_charset(future.result())
                except Exception as exc:
                    print(exc)
                else:
                    print('finished')
    
    def judge_charset(self, content: bytes):
        pass
                

    def __str__(self):
        return f'<spider-{self.name}>'


