import psycopg2
from fastapi import Depends, FastAPI , Header , HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from passlib.hash import bcrypt
from jose import jwt
from fastapi.security import  OAuth2PasswordBearer

app = FastAPI()

from fastapi import Request

@app.post("/debug")
async def debug(request: Request):
    body = await request.body()
    return {"body": body.decode()}

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:5173","http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

SECRET_KEY="mysecretkey"
ALGORITHM="HS256"

oauth2_scheme=OAuth2PasswordBearer(tokenUrl="login")



def get_current_user (token: str):
     payload = jwt.decode(
         token,
         SECRET_KEY,
        algorithms=[ALGORITHM]
    )
     
     username= payload["username"]
     return username

class TaskCreate(BaseModel):
    title:str

@app.post("/tasks")
def create_task(task: TaskCreate,
                token: str= Depends(oauth2_scheme)):
    username = get_current_user(token)
    conn = psycopg2.connect(
        host="localhost",
        database="studyplanner",
        user ="postgres",
        password="0709"
    )
    cursor=conn.cursor()
    cursor.execute("SELECT id FROM users WHERE username = %s",(username,))
    row= cursor.fetchone()

    
    if row is None:
        return {"message":"User not found"}


    user_id = row[0]
    cursor.execute("INSERT INTO tasks (title,completed,user_id) VALUES (%s,%s,%s)",(task.title,False,user_id))
    conn.commit()

    cursor.close()
    conn.close()

    return {"message":"Task created"}



class TaskUpdate(BaseModel):
    completed:Optional[bool]= None
    title:Optional[str]= None

@app.put("/tasks/{id}")
def update_task(id: int,task: TaskUpdate,token: str= Depends(oauth2_scheme) ):
    username = get_current_user(token)

    conn = psycopg2.connect(
        host="localhost",
        database="studyplanner",
        user ="postgres",
        password="0709"
    )
    cursor=conn.cursor()
    cursor.execute("SELECT id FROM users WHERE username = %s",(username,))
    row= cursor.fetchone()

    if row is None:
        return {"message":"User not found"}

    user_id = row[0]
    cursor.execute("SELECT title, completed FROM tasks WHERE id=%s AND user_id= %s",(id,user_id))
    existing = cursor.fetchone()
    if existing is None :
        return{"message": "Task not found"}
    new_title = task.title if task.title is not None else existing[0]
    new_completed = task.completed if task.completed is not None else existing[1]




    cursor.execute("UPDATE tasks SET title =%s, completed = %s WHERE id= %s AND user_id=%s ",(new_title,new_completed,id,user_id))
    if cursor.rowcount==0:
        conn.rollback
        return {"message":"Task not found or You do not have authority to update it "}
    conn.commit()

    cursor.close()
    conn.close()

    return {"message":"Task updated"}




@app.delete("/tasks/{id}")
def delete_task(id:int, token: str= Depends(oauth2_scheme)):
    username = get_current_user(token)

    conn = psycopg2.connect(
        host="localhost",
        database="studyplanner",
        user ="postgres",
        password="0709"
    )
    cursor=conn.cursor()
    cursor.execute("SELECT id FROM users WHERE username = %s",(username,))
    row= cursor.fetchone()

    if row is None:
        return {"message":"User not found"}

    user_id = row[0]

    cursor.execute("DELETE FROM tasks WHERE id = %s AND user_id=%s",(id,user_id))
    if cursor.rowcount==0:
        conn.rollback
        return {"message":"Task not found or You do not have authority to update it "}
    conn.commit()

    cursor.close()
    conn.close()

    return {"message":"Task deleted"}



    



@app.get("/")
def home ():
    return {"message": "AI study planner Backend Working"}

@app.get("/tasks")
def get_tasks(token: str= Depends(oauth2_scheme)):
    username = get_current_user(token)
    print ("Username= ", username)

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
    conn.close()
    
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

    cursor.execute("SELECT * FROM users WHERE username=%s",(user.username,))
    existing_user=cursor.fetchone()

    if existing_user:
        raise HTTPException(
            status_code=409,
            detail="Username already exists"
        )

    cursor.execute("INSERT INTO users (username,password) VALUES (%s,%s)",(user.username,hashed_password))
    conn.commit()

    cursor.close()
    conn.close()


    return{"message":"User created"}

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
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
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
    raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )


    




