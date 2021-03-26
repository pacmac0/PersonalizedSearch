import scrapy
from urllib.parse import unquote
from ..items import NewsItem
import os
import json

class MSNSpider(scrapy.Spider):
    name = "msn"
    allowed_domains = ["msn.com"]

    # start_urls = [
    #     # ss
    #     "https://mind201910small.blob.core.windows.net/archive/AAGH0ET.html",
    #     # ar
    #     "https://mind201910small.blob.core.windows.net/archive/AABmf2I.html",
    #     # vi
    #     "https://mind201910small.blob.core.windows.net/archive/AAI33em.html"
    # ]

    def __init__(self):
        with open('./doc_type.json', 'r') as f:
            self.doc_type = json.load(f)
            self.lineCount = 0
            self.news_ids_list = []
            self.categories_list = []
            self.sub_categories_list = []
            self.titles_list = []
            self.abstracts_list = []
            self.title_entities_list = []
            self.abstract_entites_list = []

        super().__init__()
        
    
    def start_requests(self):
        with open(os.environ["MIND_NEWS_PATH"], 'r') as f:
            for l in f:
                news_id, category, sub_category, title, abstract, url, title_entities, abstract_entites = l.strip('\n').split('\t')
                yield scrapy.Request(url=url, callback=self.parse, meta={
                    'news_id': news_id,
                    'category': category,
                    'sub_category': sub_category,
                    'title': title,
                    'abstract': abstract,
                    'url': url,
                    'title_entities': title_entities,
                    'abstract_entites': abstract_entites,
                })

    def parse(self, response):
        url = unquote(response.url)
        item = NewsItem()
        item['url'] = url
        # parse nid, vert and subvert
        nid_type = self.parse_nid_from_url(item, url)

        # add news columns to item
        self.fillItemUp(item, response.meta)

        # parse body from response
        self.parse_body(response, item, nid_type)

        yield item

    def fillItemUp(self, item, meta):
        item['news_id']          = meta['news_id']
        item['category']         = meta['category']
        item['sub_category']     = meta['sub_category']
        item['title']            = meta['title']
        item['abstract']         = meta['abstract']
        item['title_entities']   = meta['title_entities']
        item['abstract_entites'] = meta['abstract_entites']
        

    def parse_nid_from_url(self, item, url):
        item['nid'] = url.split('/')[-1].split('.')[-2]
        return self.doc_type[item['nid']]

    def parse_body(self, response, item, nid_type):

        # if metadate contains description take it as the first sentence
        # body_desc = response.xpath('//meta[@name="description"]/@content')[0].extract()

        # type1: ar-nid
        if nid_type == 'ar':
            body = response.xpath('//p/text()').getall()

        # type2: ss
        if nid_type == 'ss':
            body = response.xpath('//div[@class="gallery-caption-text"]//text()').getall()

        # type3: vi
        if nid_type == 'vi':
            body = response.xpath('//div[@class="video-description"]//text()').getall()

        item['body'] = "".join(body)
        

         
        