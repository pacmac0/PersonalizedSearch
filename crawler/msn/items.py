# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class NewsItem(scrapy.Item):
    news_id = scrapy.Field()
    category = scrapy.Field()
    sub_category = scrapy.Field()
    title = scrapy.Field()
    abstract = scrapy.Field()
    url = scrapy.Field()
    title_entities = scrapy.Field()
    abstract_entites = scrapy.Field()
    nid = scrapy.Field()
    body = scrapy.Field()
    pass

