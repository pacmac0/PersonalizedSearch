import elasticsearch
import api.utils as utils
from flask import request, g, make_response
import json
JSON_MIME_TYPE = 'application/json; charset=utf-8'
from elasticsearch import Elasticsearch

es = Elasticsearch()
def success_response(result, message=''):
    format = {'status': 'success',
                  'message': message,
                  'result': result}
    return json_response(json.dumps(format))

def json_response(data='', status=200, headers=None):
    headers = headers or {}
    if 'Content-Type' not in headers:
        headers['Content-Type'] = JSON_MIME_TYPE
    return make_response(data, status, headers)

def success_message(message):
    format = {'status': 'success',
              'result': message}

    return json_response(json.dumps(format))

def regular_search():
    data = request.args
    results = utils.search(data["query"], es)
    return success_response(results)



def update_user():
    data = request.args
    # retrieve user
    user = utils.get_user(data["id"], es)
    # check if user exists and update if so
    if user["hits"]["total"]["value"] == 1:
        body = {
            "script": {
                "source": "if (ctx._source.history.contains(params.click)) { ctx._source.history.remove(ctx._source.history.indexOf(params.click))} ctx._source.history.add(params.click)",
                "lang": "painless",
                "params": {
                "click": data["click"]
                }
            }
        }   
        results = es.update(index="users", id=data["id"], body=body)
    # Add user to index if user does not exist
    else:
        history = [data["click"]]
        doc = {"user_id":data["id"], "history":history}
        results = es.index(index='users', id=data["id"], body=doc)
    return success_response(results)

# This method is to fetch the user details (DEBUGGING)
def get_user():
    data = request.args
    results = utils.get_user(data["id"], es)
    return success_response(results)


def get_history():
    data = request.args
    user = utils.get_user(data["id"], es)
    if user["hits"]["total"]["value"] != 1:
        return success_response({"docs": []})
    # ------------------------------------------
    history = user["hits"]["hits"][0]["_source"]["history"]
    if len(history) > 10:
        history = history[-10:]
        
    history.reverse()
    docstoretrieve = {"docs" : [{"_id": elem} for elem in history]}
    if len(docstoretrieve["docs"]) == 0:
            return success_response([])
    docs = es.mget(body=docstoretrieve, index="news")
    return success_response(docs)


def delete_user():
    data = request.args
    results = es.delete(index="users", id=data["id"])
    return success_response(results)


def get_recommendations():
    data = request.args
    body = {
    "query": {
        "bool": {
        "must": {
            "term": {
            "history.keyword": data["id"]
            }
        }
        }
    },
    "aggs": {
        "recommendations": {
        "significant_terms": {
            "field": "history.keyword",
            "exclude": data["id"],
            "min_doc_count": 1
        }
        }
        }
    }
    recommendations = es.search(index = "users", body = body)
    docstoretrieve = {"docs" : [{"_id": elem["key"]} for elem in recommendations["aggregations"]["recommendations"]["buckets"]]}
    if len(docstoretrieve["docs"]) == 0:
            return success_response([])
    docs = es.mget(body=docstoretrieve, index="news")
    return success_response(docs)

def get_news_by_id():
    data = request.args
    results = es.get(index="news", id=data["id"])
    return success_response(results)

def personalized_search():
    data = request.args
    user = utils.get_user(data["id"], es)
    news_fields = ['title','category','body']

    # Regular search
    search_results = utils.search(data["query"], es)

    # Return regular search if user does not exist
    if user["hits"]["total"]["value"] != 1:
        return success_response(search_results["hits"]["hits"])
    # ------------------------------------------

    history = user["hits"]["hits"][0]["_source"]["history"]
    if len(history) > 10:
        history = history[-10:]
    
    # Term vectors of history ids. 
    results = utils.get_term_vectors(history, news_fields, es)
    ret = dict()
    # to compute the mean
    normalization = dict()
    for c in news_fields:
        ret[c] = dict()
        normalization[c] = dict()
    for doc in results['docs']:
        if "term_vectors" in doc:
            for k in news_fields:
                if k in doc["term_vectors"]:
                    term_vec = doc["term_vectors"][k]["terms"]
                    for t, t_value in term_vec.items():
                        if t in ret[k]:
                            # change it with the mean
                            ret[k][t] += t_value["score"]
                            normalization[k][t] += 1
                        else:
                            ret[k][t] = t_value["score"]
                            normalization[k][t] = 1
    # compute the mean
    for field in ret.keys():
        for term in ret[k].keys():
            ret[k][t] = ret[k][term]/normalization[k][term]
    
    # Normalize
    for key, value in ret.items():
        ret[key] = utils.normalize_vec(value)

    # Obtain documents vectors 
    ids = []
    docs_vectors = dict()
    # find doc ids 
    for s_rslt in search_results["hits"]["hits"]:
        ids.append(s_rslt["_id"])
    # construct doc vectors
    results_doc = utils.get_term_vectors(ids, news_fields, es)
    for doc in results_doc['docs']:
        if "term_vectors" in doc:
            docs_vectors[doc["_id"]] = dict()
            for k in news_fields:
                if k in doc["term_vectors"]:
                    docs_vectors[doc["_id"]][k] = dict()
                    term_vec = doc["term_vectors"][k]["terms"] 
                    for t, t_value in term_vec.items():
                        docs_vectors[doc["_id"]][k][t] = t_value["score"]

    # Doc 1
    #   body: "term" ; score ... "term_n" ; score_n
    #   title: "term" ; score ... "term_n" ; score_n
    #   category: "term" ; score ... "term_n" ; score_n
    # Doc 2
    #   body: "term" ; score ... "term_n" ; score_n
    #   title: "term" ; score ... "term_n" ; score_n
    #   category: "term" ; score ... "term_n" ; score_n

    # (Cosine similarity) Dot product and sort search results

    # user vector = w_1*body_vector + w_1*category + w_3*title
    weights = dict()
    weights["body"] = 1
    weights["category"] = 2
    weights["title"] = 2.5
    user_vector  = utils.aggregate_vecs(ret, weights)

    scores = dict()
    for doc, vector in docs_vectors.items():
        for key, value in vector.items():
            vector[key] = utils.normalize_vec(value)
        document_vector  = utils.aggregate_vecs(vector, weights)
        score = utils.cosine_similarity(document_vector, user_vector)
        scores[doc] = score
    

    # new_score = old_score + alpha*user_vector * doc_score
    p = 0.85
    # normlize the old_score and new_score
    norm_old = 0
    for s_rslt in search_results["hits"]["hits"]:
        norm_old += s_rslt['_score']

    norm_new = 0
    for score in scores.values():
        norm_new += score

    # change documents score
    for s_rslt in search_results["hits"]["hits"]:
        s_rslt['_score'] = (1-p) * s_rslt['_score']/norm_old + p*scores[s_rslt['_id']]/norm_new
    # reorder documents

    search_results["hits"]["hits"] = sorted(search_results["hits"]["hits"], key=lambda k: k['_score'], reverse=True)
    return success_response(search_results["hits"]["hits"])




