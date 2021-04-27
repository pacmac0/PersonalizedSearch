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

def get_term_vectors(ids, news_fields, es):
    body = {
        "ids": ids,
        "parameters": {
            "fields": news_fields,
            "offsets" : False,
            "payloads" : False,
            "positions" : False,
            "term_statistics" : True,
            "field_statistics": True,
            "filter": {
                "min_term_freq": 1,
            }
        }
    }
    results = es.mtermvectors(body=body, index="news")
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


def cosine_similarity(vec1, vec2):
    
    # Normalize vectors with L2-norm
    n_vec1 = normalize_vec(vec1, ord_=2)
    n_vec2 = normalize_vec(vec2, ord_=2)

    # sum the similarity
    ret = 0.0
    for w in n_vec1.keys(): # w: an iterator for word
        ret += n_vec1.get(w, 0) * n_vec2.get(w, 0)

    return ret
