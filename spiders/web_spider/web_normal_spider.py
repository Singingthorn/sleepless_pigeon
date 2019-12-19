"""
    web spider
"""
import time
import json
import random
from typing import List, Any, Tuple
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests
from lxml import etree

from base_spider.base_spider import BaseSpider
from settings import JOBS, REDIS_CHANNEL


class WebNormalSpider(BaseSpider):
    """normal web spider class
    """
    def __init__(self, jobs: str, name: str, channel: str) -> None:
        super(__class__, self).__init__(jobs, name, channel)

    def send_request(self):
        """Send request from URLs pools
        """
        def load_url(job: Any, timeout: int) -> Tuple[Any, Any]:
            if not job.get('url'): return None
            self.before_request(**{})
            resp = requests.get(
                    job['url'], 
                    headers=self.headers,
                    timeout=timeout,
                    verify=True
                )
            return resp, job

        with ThreadPoolExecutor(max_workers=5) as executor:
            future_to_url = [executor.submit(load_url, job, 16) for job in self.jobs]

            for future in as_completed(future_to_url):
                try:
                    resp, job = future.result()
                    charset = self.judge_charset(resp)
                    items = self.deal_response(resp.content.decode(charset), job)
                    self.throw_data(items)
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
        """Return JSON data according to XPath. Get tag a and text between tag.
        
        :param content: decoded response content
        """
        tree = etree.HTML(content)
        tags = tree.xpath(job['selector'])
        if not tags: 
            return None
        items = [{
            'title': tag.xpath('string(.)'),
            'href': tag.get('href'),
            'source': job['source'],
            'ctime': int(time.time()),
            'utime': int(time.time()),
            'content': '',
            } for tag in tags]
        return json.dumps(items)
        
    def __str__(self):
        return f'<spider-{self.name}>'


if __name__ == "__main__":
    # just for test
    jobs = json.dumps(JOBS)
    web_normal_spider = WebNormalSpider(
        jobs, 
        'normal_spdier', 
        getattr(REDIS_CHANNEL, 'web')
    )
    web_normal_spider.send_request()


