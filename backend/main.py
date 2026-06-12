import psycopg2
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from passlib.hash import bcrypt
from jose import jwt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173","http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class TaskCreate(BaseModel):
    title:str

@app.post("/tasks")
def create_task(task: TaskCreate):
    conn = psycopg2.connect(
        host="localhost",
        database="studyplanner",
        user ="postgres",
        password="0709"
    )
    cursor=conn.cursor()

    cursor.execute("INSERT INTO tasks (title,completed) VALUES (%s,%s)",(task.title,False))
    conn.commit()

    cursor.close()
    conn.close()

    return {"message":"Task created"}



class TaskUpdate(BaseModel):
    completed:Optional[bool]= None
    title:Optional[str]= None

@app.put("/tasks/{id}")
def update_task(id: int,task: TaskUpdate):
    conn = psycopg2.connect(
        host="localhost",
        database="studyplanner",
        user ="postgres",
        password="0709"
    )
    cursor=conn.cursor()

    cursor.execute("UPDATE tasks SET title =%s, completed = %s WHERE id= %s",(task.title,task.completed,id))
    conn.commit()

    cursor.close()
    conn.close()

    return {"message":"Task updated"}




@app.delete("/tasks/{id}")
def delete_task(id:int):
    conn = psycopg2.connect(
        host="localhost",
        database="studyplanner",
        user ="postgres",
        password="0709"
    )
    cursor=conn.cursor()

    cursor.execute("DELETE FROM tasks WHERE id = %s",(id,))
    conn.commit()

    cursor.close()
    conn.close()

    return {"message":"Task deleted"}
    



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

class UserCreate(BaseModel):
    username : str
    password : str

@app.post("/signup")
def signup(user: UserCreate):

    hashed_password = bcrypt.hash(user.password)
    
    conn = psycopg2.connect(
        host="localhost",
        database="studyplanner",
        user ="postgres",
        password="0709"
    )
    cursor=conn.cursor()

    cursor.execute("INSERT INTO users (username,password) VALUES (%s,%s)",(user.username,hashed_password))
    conn.commit()

    cursor.close()
    conn.close()


    return{"message":"User created"}

SECRET_KEY="mysecretkey"
ALGORITHM="HS256"

class UserLogin(BaseModel):
    username:str
    password: str
@app.post("/login")
def login(user: UserLogin):
    conn = psycopg2.connect(
        host="localhost",
        database="studyplanner",
        user ="postgres",
        password="0709"
    )
    cursor=conn.cursor()

    cursor.execute("SELECT password From users WHERE username =%s",(user.username,))

    row=cursor.fetchone()
    cursor.close()
    conn.close()

    if row is None :
        return{"message":"Invalid username/password"}
    
    stored_hash= row[0]

    if bcrypt.verify(user.password,stored_hash):
        return{"message":"Login successfull"}
    
    return{"message":"Invalid username/password"}
    




