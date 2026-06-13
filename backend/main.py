import psycopg2
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from passlib.hash import bcrypt
from jose import jwt
from fastapi import Header 

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
def get_tasks(authorization: str= Header()):

    token = authorization.replace ("Bearer","")
    username = get_current_user(token)

    conn = psycopg2.connect(
    host="localhost",
    database="studyplanner",
    user ="postgres",
    password="0709"
)
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM users WHERE username =%s",(username,))
    row=cursor.fetchone()

    if row is None:
        return {"message":"User not found"}

    user_id= row[0]
    cursor.execute("SELECT * FROM tasks WHERE user_id = %s",(user_id,))

    rows = cursor.fetchall()

    tasks = []
    for row in rows :
        tasks.append ({
            "id":row[0],
            "title": row[1],
            "completed":row[2]
        })

    cursor.close()
    conn.close
    
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
        token= jwt.encode(
            {
                "username":user.username
            },
            SECRET_KEY,
            algorithm=ALGORITHM
        )
        return{
            "access_token":token
        }
    return{"message":"Invalid username/password"}

@app.get("/me")
def get_me():

    payload = jwt.decode(
         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFua2VzaCJ9.L7Mmp3Dp4g7qDt0fcFRT-utlIMvjQ9135z7178fsK5o",
        SECRET_KEY,
        algorithms=[ALGORITHM]
    )
    return payload

def get_current_user (token: str):
     payload = jwt.decode(
         token,
         SECRET_KEY,
        algorithms=[ALGORITHM]
    )
     
     username= payload["username"]
     return username
    




