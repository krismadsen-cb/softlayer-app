import os
import pymysql

conn = pymysql.connect(host=os.environ['DB_HOST'],
                       port=int(os.environ['DB_PORT']),
                       user=os.environ['DB_USER'],
                       passwd=os.environ['DB_PASS'],
                       db=os.environ['DB'],
                       autocommit=True)
cursor = conn.cursor()

cursor.execute('delete from sl_tickets')
cursor.execute('delete from sl_events')

conn.commit()
conn.close()
