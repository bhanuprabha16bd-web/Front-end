from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


users = [
    {
        "id": 1,
        "name": "Bhanu",
        "email": "Bhanu@example.com",
        "role": "Frontend Developer",
        "bio": "Passionate React developer",
        "company": "Tech Solutions",
        "website": "https://Bhanu.dev"
    },
    {
        "id": 2,
        "name": "Anu",
        "email": "Anu@example.com",
        "role": "Backend Developer",
        "bio": "Python and API developer",
        "company": "CodeCraft",
        "website": "https://Anu.dev"
    },
    {
        "id": 3,
        "name": "vani",
        "email": "vani@example.com",
        "role": "Backend Developer",
        "bio": "Python and API developer",
        "company": "CodeCraft",
        "website": "https://vani.dev"
    }
]


class User(BaseModel):
    name: str
    email: str
    role: str
    bio: str
    company: str
    website: str


@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}


@app.get("/users")
def get_users():
    return {"success": True, "data": users}


@app.get("/users/{user_id}")
def get_user(user_id: int):
    for user in users:
        if user["id"] == user_id:
            return {"success": True, "data": user}

    raise HTTPException(status_code=404, detail="User not found")


@app.post("/users")
def create_user(user: User):
    new_user = {
        "id": len(users) + 1,
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "bio": user.bio,
        "company": user.company,
        "website": user.website
    }

    users.append(new_user)

    return {
        "success": True,
        "message": "User created successfully",
        "data": new_user
    }