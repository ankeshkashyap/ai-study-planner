import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="studyplanner",
    user ="postgres",
    password="0709"
)
cursor = conn.cursor()
cursor.execute("SELECT * from tasks;")
rows = cursor.fetchall()
print(rows)

cursor.close()
conn.close