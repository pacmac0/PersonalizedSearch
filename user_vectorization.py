from elasticsearch import Elasticsearch
import json
import ElastifConfig

src = 'data/user_data/user0.json'


def get_term_vectors_from_history(es, history_ids, index, fields):
    body = {
        "ids": history_ids,
        "parameters": {
            "fields" : fields,
            "offsets" : False,
            "payloads" : False,
            "positions" : False,
            "term_statistics" : True,
            "field_statistics": (Config.weight_scheme == "tfidf"),
        }
    }
    resp = es.mtermvectors(index=index, body=body)
    # build up the return
    ret = dict()

    for d in resp['docs']:
        if "term_vectors" in d:
            doc_id = d['_id']
            ret[doc_id] = dict()
            for k in fields:
                term_vec = term_vector_to_weight(d["term_vectors"][k], Config.weight_scheme)
                ret[doc_id][k] = term_vec


def term_vector_to_weight():






def vectorize_users():
    es = Elasticsearch(Config.elastic_host, port=Config.elastic_port, timeout=Config.timeout)

    with open(src, 'r') as user_histories:
        for idx, line in enumerate(f_in):
            if idx % 2 != 0:
                continue
            
            user_hist = json.loads(line)



