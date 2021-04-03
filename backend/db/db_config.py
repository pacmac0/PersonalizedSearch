import sqlite3 as sq
from flask import g
DATABASE_DIR = "/Users/peppercake/KTH/search/backend/db"
DB_NAME = 'Users.db'
TABLE_NAME = 'Users'
DATABASE_PATH = DATABASE_DIR + '/' + DB_NAME
# The method returns the database instance 
def get_db():
    if 'db' not in g:
        g.db = sq.connect(DATABASE_PATH, detect_types=sq.PARSE_DECLTYPES)
        g.db.row_factory = sq.Row
    return g.db