class ElastifConfig:
    index = "news"
    # relative importance between term vectors
    weights = {
        "title": 2.0,
        "category": 1.5,
        "text": 1.0,
    }
    
    elastic_host = "localhost"
    elastic_port = "9200"
    timeout = 100
