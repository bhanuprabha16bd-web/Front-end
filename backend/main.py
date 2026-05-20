from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/users")
def get_users():
    users = requests.get(
        "https://jsonplaceholder.typicode.com/users"
    ).json()

    return users

@app.get("/users/{id}")
def get_user(id: int):
    user = requests.get(
        f"https://jsonplaceholder.typicode.com/users/{id}"
    ).json()

    return user