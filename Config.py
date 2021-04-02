class Config:
    index = "news"
    # relative importance between term vectors
    weights = {
        "title": 2.0,
        "category": 1.5,
        "body": 1.0,
    }
    
    elastic_host = "localhost"
    elastic_port = "9200"
    timeout = 100

    news_fields = ['title','category','body']