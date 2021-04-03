import sqlite3 as sq
from db_config import *
conn = sq.connect(DATABASE_PATH)
cur = conn.cursor()
conn.execute('CREATE TABLE if not exists ' + TABLE_NAME + ' (' +
             'ID TEXT PRIMARY KEY NOT NULL, '
             'VECTOR TEXT NOT NULL' + ' );')
conn.commit()
conn.close()