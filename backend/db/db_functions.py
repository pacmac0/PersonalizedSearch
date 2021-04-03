from flask import request, g
from flask import make_response
import json
JSON_MIME_TYPE = 'application/json; charset=utf-8'


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


# This method is to fetch the students details
def get_user():
    if request.method == 'POST':
        data = request.args
        user_cursor = g.db.execute("SELECT * FROM "
                                   "Users WHERE "
                                   "ID=?",
                                   (data["id"],))
        data = user_cursor.fetchall()
        user_data = [{'id': row[0], 'vector': row[1]} for row in data]

        return success_response(user_data)

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


        



