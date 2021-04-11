from .utils import normalize_vec
from flask import request, g
from flask import make_response
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

def update_user():
    data = request.args
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
    return success_response(results)

# This method is to fetch the students details
def get_user():
    data = request.args
    """
    if request.method == 'POST':
        data = request.args
        user_cursor = g.db.execute("SELECT * FROM "
                                   "Users WHERE "
                                   "ID=?",
                                   (data["id"],))
        data = user_cursor.fetchall()
        user_data = [{'id': row[0], 'vector': row[1]} for row in data]

        return success_response(user_data)
    """
    body = {
            "query": {
                "match": {"user_id":data["id"]}
            }
        }
    results = es.search(index = "users", body=body)
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
            "min_doc_count": 100
        }
        }
        }
    }
    results = es.search(index = "users", body = body)
    return success_response(results["aggregations"]["recommendations"]["buckets"])

def get_user_vector():
    data = request.args
    news_fields = ['title','category','body']

    body = {
        "ids": json.loads(data["news"]),
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
    ret = dict()
    for c in news_fields:
        ret[c] = dict()
    for doc in results['docs']:
        if "term_vectors" in doc:
            for k in news_fields:
                # some news haven't a field (N47482 haven't a text)
                if k in doc["term_vectors"]:
                    term_vec = doc["term_vectors"][k]["terms"]
                    for t, t_value in term_vec.items():
                        if t in ret[k]:
                            ret[k][t] += t_value["score"]
                        else:
                            ret[k][t] = t_value["score"]
    
    # Normalize
    for key, value in ret.items():
        ret[key] = normalize_vec(value)

    # Aggregate ? 

    return success_response(ret)

def store_user():
    if request.method == 'POST':
        data = request.args
        print(data["vector"])
        user_cursor = g.db.execute("SELECT * FROM "
                                    "Users WHERE "
                                    "ID=?", (data["id"],))
        # CHECK IF USER ALREADY EXISTS - Temporary
        if len(user_cursor.fetchall()) >= 1:
            return success_message("User details is "
                                "already Stored !!")
        else:
            query = ('INSERT INTO Users (ID, VECTOR)'
                     ' VALUES (:ID, :VECTOR);')
            param = {
                'ID': data["id"],
                'VECTOR': data["vector"]}
            g.db.execute(query, param)
            g.db.commit()
            data_cursor = g.db.execute("SELECT * FROM "
                                    "Users WHERE "
                                    "ID=?",
                                    (data["id"],))
            data = data_cursor.fetchall()
            user_data = [{'id': row[0], 'vector': row[1]} for row in data]
            return success_response(user_data, "These are the students stored into records")


        



