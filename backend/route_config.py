from db.db_functions import get_user, store_user
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
def get_students_list():
    return get_user()
# This is POST method which stores students details.
@app.route('/api/storeuser', methods=['POST'])
def store_student_data():
    return store_user()
# This method executes after every API request.
@app.after_request
def after_request(response):
    return response