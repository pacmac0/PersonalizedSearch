from elasticsearch import Elasticsearch
import numpy as np
import json
import sys

def get_user(id, es):
    body = {
        "query": {
            "match": {"user_id":id}
        }
    }
    user = es.search(index = "users", body=body)
    return user

def search(query, es):
    body = {
        "query": {
                "bool": {
                    "should": [
                        { "match": { "abstract" : query}},
                        { "match": { "title" : query}},
                        { "match": { "category" : query}},
                        { "match": { "sub_category" : query}},
                        { "match": { "body" : query}}
                    ]
                }
            }
        }
    results = es.search(index="news", body=body)
    return results

def aggregate_vecs(user_vectors, weights):

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




