import psycopg2
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173","http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home ():
    return {"message": "AI study planner Backend Working"}

@app.get("/tasks")
def get_tasks():
    conn = psycopg2.connect(
    host="localhost",
    database="studyplanner",
    user ="postgres",
    password="0709"
)
    cursor = conn.cursor()
    cursor.execute("SELECT * from tasks;")
    rows = cursor.fetchall()

    cursor.close()
    conn.close
    tasks=[]
    for row in rows :
        task={
            "id":row[0],
            "title":row[1],
            "completed":row[2]
        }
        tasks.append(task)
    
    return tasks




