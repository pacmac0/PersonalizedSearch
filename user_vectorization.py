from elasticsearch import Elasticsearch
from utils import get_tfidf_score
import numpy as np
import json
from config import Config
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
        if "term_vectors" in doc:
            doc_id = doc['_id']
            ret_obj[doc_id] = dict()
            for k in fields:
                # some news haven't a field (N47482 haven't a text)
                # cause problem
                if k in doc["term_vectors"].keys():
                    term_vec = term_vector_to_weight(doc["term_vectors"][k])
                    ret_obj[doc_id][k] = term_vec
                else:
                    ret_obj[doc_id][k] = None
    return ret_obj

def term_vector_to_weight(term_vecs):
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


def aggregate_vecs(user_vectors, weights):
    """
    Args:
        term_vecs:
        {
            "title": {
                'sweden': 1.0,
                ...
            }
            "text": {
                'sweden': 1.0,
                ...
            }
            ...,
        }
    """
    ret = dict()

    weight_sum = 0
    for cat in weights.keys():
        weight_sum += weights[cat]

    for cat in weights.keys():
        if cat not in user_vectors:
            continue
        w = weights[cat] / weight_sum
        t_vec = user_vectors[cat]
        n_t_vec = normalize_vec(t_vec)
        for term in n_t_vec.keys():
            if term not in ret:
                ret[term] = 0
            ret[term] += w*t_vec[term]

    return ret


def normalize_vec(term_vec, ord_=2):
    elements = list(term_vec.values())
    norm = np.linalg.norm(elements, ord=ord_)

    ret = dict()
    for t in term_vec.keys():
        ret[t] = term_vec[t] / norm

    return ret

def vectorize_users():
    es = Elasticsearch(Config.elastic_host, port=Config.elastic_port, timeout=Config.timeout)

    with open(src, 'r') as user_histories:
        for idx, user_str in enumerate(user_histories):
            if idx % 2 == 0: # exclude the elastic identifier line
                continue
            user_hist = json.loads(user_str)
            user_obj = get_term_vectors_from_history(es, user_hist['history'], Config.index, Config.news_fields)
            user_id = user_hist['user_id']

            # agregate vectors
            for doc_id, user_vectors in user_obj.items():
                ret = aggregate_vecs(user_vectors, Config.weights)
                user_obj[doc_id] = ret
            #
            # TODO add agregated vectors using expo decaying 

            # 
            # TODO store in DB
            break


if __name__ == '__main__':
    vectorize_users()