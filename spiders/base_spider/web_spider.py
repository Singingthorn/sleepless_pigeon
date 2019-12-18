"""
    web spider
"""
import json
import random
from typing import List, Any
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests
from lxml import etree

from .base_spider import BaseSpider


class WebSpider(BaseSpider):
    """Basic web spider class
    """
    def __init__(self, jobs: str, name: str) -> None:
        super(__class__, self).__init__(jobs, name)
        self.headers = {}

    def send_request(self):
        """Send request from URLs pools
        """
        def load_url(self, url: str, timeout: int) -> bytes:
            resp = requests.get(
                    url, 
                    headers=self.headers,
                    timeout=timeout
                )
            return resp

        with ThreadPoolExecutor(max_workers=5) as executor:
            future_to_url = {executor.submit(load_url, job['url'], 16): job for job in self.jobs}
            for future in as_completed(future_to_url):
                url = future_to_url[future]
                try:
                    charset = self.judge_charset(future.result())
                    future
                except Exception as exc:
                    print(exc)
                else:
                    print('all request send finished')
    
    def judge_charset(self, resp: Any) -> str:
        """Return correct charset from response
        
        :param resp: response of HTTP request 
        """
        # from header-content_type-charset
        charset = resp.apparent_encoding
        if charset == 'ISO-8859-1':
            # from resp_body-meta-charset
            charset = requests.utils.get_encodings_from_content(str(resp.content))
        if 'gb' in charset.lower():
            charset = 'gbk'
        return charset

    def deal_response(self, content: str, job: Any) -> str:
        """Return JSON data according to XPath
        
        :param content: decoded response content
        """
        tree = etree.HTML(content)
        tags = tree.xpath(job['selector'])
        if not tags: 
            return None


    def __str__(self):
        return f'<spider-{self.name}>'


