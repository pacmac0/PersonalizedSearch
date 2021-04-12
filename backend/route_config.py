from flask import Flask
from api.api import *
# app reference
app = Flask(__name__)


# This method returns students 
# list and by default method will be GET
@app.route('/api/getuser', methods = ['POST'])
def getuser():
    return get_user()

@app.route('/api/updateuser', methods=['POST'])
def updateuser():
    return update_user()

@app.route('/api/regularsearch', methods=['POST'])
def regularsearch():
    return regular_search()

@app.route('/api/getrecommendation', methods=['POST'])
def getrecommendations():
    return get_recommendations()

@app.route('/api/personalizedsearch', methods=['POST'])
def personalizedsearch():
    return personalized_search()
# This method executes after every API request.
@app.after_request
def after_request(response):
    return response

