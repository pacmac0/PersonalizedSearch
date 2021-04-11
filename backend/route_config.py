from db.db_functions import get_user, get_recommendations, get_user_vector, update_user
from db.db_config import get_db
from flask import Flask
from db.db_functions import *
# app reference
app = Flask(__name__)

# This method executes before any API request
@app.before_request
def before_request():
    g.db = get_db()
# This method returns students 
# list and by default method will be GET
@app.route('/api/getuser', methods = ['POST'])
def getuser():
    return get_user()

@app.route('/api/updateuser', methods=['POST'])
def updateuser():
    return update_user()

@app.route('/api/getrecommendation', methods=['POST'])
def getrecommendations():
    return get_recommendations()

@app.route('/api/getuservector', methods=['POST'])
def getuservector():
    return get_user_vector()
# This method executes after every API request.
@app.after_request
def after_request(response):
    return response

