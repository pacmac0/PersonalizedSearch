from elasticsearch import Elasticsearch
import json
import ElastifConfig
import utils
import sys

src = 'data/user_data/user0.json'


def get_term_vectors_from_history(es, history_ids, index, fields):
    """
    Get term vectors of users history articles
    Args:
        es = elastic search instance
        ids = list of article IDs
        index = name of the elastic search index
    Return:
        a dictionary of form:
        {
            <id1>:{
                "title": term_vec_for_title,
                "text": term_vec_for_text,
                "category": term_vec_for_cat,
            },
            <id2>:{
                ...
            }
        }
    """
    body = {
        "ids": history_ids,
        "parameters": {
            "fields" : fields,
            "offsets" : False,
            "payloads" : False,
            "positions" : False,
            "term_statistics" : True,
            "field_statistics": True,
        }
    }
    response = es.mtermvectors(index=index, body=body)
    # assemble return object
    ret_obj = dict()

    for doc in response['docs']:
        if "term_vectors" in d:
            doc_id = doc['_id']
            ret[doc_id] = dict()
            for k in fields:
                term_vec = term_vector_to_weight(doc["term_vectors"][k])
                ret[doc_id][k] = term_vec
    return ret_obj

def term_vector_to_weight(term_vec):
    """
    Computes the tf-idf weight of a given term-vector
    Args:
        term_vecs: a dictionary with terms as keys
        E.g.
            {
                'field_statistics': {
                    'sum_doc_freq': 3217420,
                    'doc_count': 1169019,
                    'sum_ttf': 3228465
                },
                'terms': {
                    'actor': {
                        'doc_freq': 45598,
                        'ttf': 110098,
                        'term_freq': 1
                    },
                    ...
                }
            }
    Return:
        Term weight mapping
        E.g.
        {
            "science": 123.11,
            "usa": 12.34,
            ...
        }
    """
    # get the relevant counts for tf-idf scorring
    doc_count = term_vecs['field_statistics']['doc_count']
    
    ret = dict()
    for term in term_vecs['terms']:
        ret[term] = get_tfidf_score(term_vecs['terms'][term], doc_count)
    return ret

def vectorize_users():
    es = Elasticsearch(Config.elastic_host, port=Config.elastic_port, timeout=Config.timeout)

    with open(src, 'r') as user_histories:
        for idx, line in enumerate(f_in):
            if idx % 2 != 0:
                continue
            
            user_hist = json.loads(line)

            get_term_vectors_from_history(es, user_hist['history'], 'news', ['title','category','body'])


def main():

if __name__ == '__main__':
    vectorize_users()