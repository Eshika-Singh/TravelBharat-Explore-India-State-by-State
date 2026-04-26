from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
import json
import os
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
       "https://travel-bharat-explore-india-state-b-omega.vercel.app/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

USERS_FILE = "users.json"

def load_users():
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, "w", encoding="utf-8") as f:
            json.dump([], f, indent=2)
        return []

    with open(USERS_FILE, "r", encoding="utf-8") as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return []

def save_users(users):
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(users, f, indent=2)

places_data = {
    "rajasthan": [
        {
            "name": "Jaipur",
            "state": "Rajasthan",
            "description": "Famous for palaces, forts, and the iconic Pink City architecture.",
            "image": "/images/places/jaipur.jpeg",
        },
        {
            "name": "Udaipur",
            "state": "Rajasthan",
            "description": "Known as the City of Lakes and loved for its scenic beauty and royal heritage.",
            "image": "/images/places/udaipur.jpg",
        },
        {
            "name": "Jodhpur",
            "state": "Rajasthan",
            "description": "Known as the Blue City and famous for Mehrangarh Fort and vibrant culture.",
            "image": "/images/places/jodhpur.jpeg",
        },
    ],
    "himachal pradesh": [
        {
            "name": "Manali",
            "state": "Himachal Pradesh",
            "description": "A popular hill station known for snowy mountains and adventure activities.",
            "image": "/images/places/manali.jpg",
        },
        {
            "name": "Shimla",
            "state": "Himachal Pradesh",
            "description": "Known for colonial charm, pleasant weather, and beautiful mountain views.",
            "image": "/images/places/shimla.jpg",
        },
        {
            "name": "Kasol",
            "state": "Himachal Pradesh",
            "description": "A scenic destination loved for river views, pine forests, and peaceful vibes.",
            "image": "/images/places/kasole.jpg",
        },
        
    ],
    "goa": [
        {
            "name": "North Goa",
            "state": "Goa",
            "description": "Popular for beaches, nightlife, cafes, and water sports.",
            "image": "/images/places/north-goa.jpg",
        },
        {
            "name": "South Goa",
            "state": "Goa",
            "description": "Famous for peaceful beaches, luxury stays, and scenic coastal beauty.",
            "image": "/images/places/south-goa.jpg",
        },
        {
            "name": "Panaji",
            "state": "Goa",
            "description": "Known for Portuguese charm, colorful streets, and riverside views.",
            "image": "/images/places/panaji.jpg",
        },
    ],
    "kerala": [
        {
            "name": "Munnar",
            "state": "Kerala",
            "description": "A beautiful hill station known for tea gardens and greenery.",
            "image": "/images/places/munnar.jpg",
        },
        {
            "name": "Alappuzha",
            "state": "Kerala",
            "description": "Famous for backwaters, houseboats, and peaceful natural beauty.",
            "image": "/images/places/alappuzha.jpg",
        },
        {
            "name": "Kochi",
            "state": "Kerala",
            "description": "Known for colonial history, waterfront charm, and cultural diversity.",
            "image": "/images/places/kochi.jpg",
        },
    ],
    "ladakh": [
        {
            "name": "Leh",
            "state": "Ladakh",
            "description": "Known for monasteries, mountain views, and high-altitude adventures.",
            "image": "/images/places/leh.jpg",
        },
        {
            "name": "Pangong Lake",
            "state": "Ladakh",
            "description": "Famous for crystal blue waters and breathtaking mountain scenery.",
            "image": "/images/places/pangong-lake.jpg",
        },
        {
            "name": "Nubra Valley",
            "state": "Ladakh",
            "description": "Known for sand dunes, double-humped camels, and dramatic landscapes.",
            "image": "/images/places/nubra-valley.jpg",
        },
    ],
    "uttar pradesh": [
        {
            "name": "Agra",
            "state": "Uttar Pradesh",
            "description": "Home to the iconic Taj Mahal and rich Mughal heritage.",
            "image": "/images/places/agra.jpg",
        },
        {
            "name": "Varanasi",
            "state": "Uttar Pradesh",
            "description": "One of the oldest living cities, famous for ghats and spiritual culture.",
            "image": "/images/places/varansi.jpg",
        },
        {
            "name": "Lucknow",
            "state": "Uttar Pradesh",
            "description": "Known for nawabi culture, architecture, and delicious cuisine.",
            "image": "/images/places/lucknow.jpg",
        },
    ],
    "maharashtra": [
        {
            "name": "Mumbai",
            "state": "Maharashtra",
            "description": "India's financial capital, known for Marine Drive and vibrant city life.",
            "image": "/images/places/mumbai.jpg",
        },
        {
            "name": "Pune",
            "state": "Maharashtra",
            "description": "A modern city known for culture, education, and weekend getaways.",
            "image": "/images/places/pune.jpg",
        },
        {
            "name": "Lonavala",
            "state": "Maharashtra",
            "description": "A scenic hill station famous for valleys, waterfalls, and monsoon views.",
            "image": "/images/places/lonavala.jpg",
        },
    ],
    "karnataka": [
        {
            "name": "Mysore",
            "state": "Karnataka",
            "description": "Famous for Mysore Palace, heritage architecture, and royal history.",
            "image": "/images/places/mysore.jpg",
        },
        {
            "name": "Coorg",
            "state": "Karnataka",
            "description": "Known for coffee plantations, greenery, and peaceful hill landscapes.",
            "image": "/images/places/coorg.jpg",
        },
        {
            "name": "Bengaluru",
            "state": "Karnataka",
            "description": "A vibrant metro city known for tech culture, cafes, and modern lifestyle.",
            "image": "/images/places/bengluru.jpg",
        },
    ],
    "tamil nadu": [
        {
            "name": "Chennai",
            "state": "Tamil Nadu",
            "description": "A coastal city known for beaches, temples, and South Indian culture.",
            "image": "/images/places/chennai.jpg",
        },
        {
            "name": "Ooty",
            "state": "Tamil Nadu",
            "description": "A hill station known for tea gardens, cool weather, and scenic views.",
            "image": "/images/places/ooty.jpg",
        },
        {
            "name": "Madurai",
            "state": "Tamil Nadu",
            "description": "Famous for Meenakshi Temple and deep-rooted cultural heritage.",
            "image": "/images/places/madurai.jpg",
        },
    ],
}

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TripPlanRequest(BaseModel):
    state: str
    days: int

@app.get("/")
async def root():
    return {"message": "Travel Bharat backend is running"}

@app.get("/places/{state}")
async def get_places_by_state(state: str):
    state_name = state.strip().lower()
    places = places_data.get(state_name, [])
    return [{**place, "_id": f"{state_name}-{i}"} for i, place in enumerate(places, start=1)]

@app.get("/search")
async def search_places(query: str):
    query_lower = query.strip().lower()
    results = []
    for _, places in places_data.items():
        for place in places:
            if (
                query_lower in place["name"].lower()
                or query_lower in place["state"].lower()
                or query_lower in place["description"].lower()
            ):
                results.append(place)
    return [{**place, "_id": f"{place['state']}-{i}"} for i, place in enumerate(results, start=1)]

@app.post("/signup")
async def signup(user: UserSignup):
    users = load_users()

    email = user.email.strip().lower()

    existing_user = next(
        (u for u in users if u["email"].strip().lower() == email),
        None
    )

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = {
        "name": user.name.strip(),
        "email": email,
        "password": user.password,
    }

    users.append(new_user)
    save_users(users)

    return {
        "message": "Account created successfully",
        "access_token": "dummy-token",
        "token_type": "bearer",
        "user": {
            "name": new_user["name"],
            "email": new_user["email"],
        }
    }

@app.post("/login")
async def login(user: UserLogin):
    users = load_users()

    email = user.email.strip().lower()

    existing_user = next(
        (u for u in users if u["email"].strip().lower() == email),
        None
    )

    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if existing_user["password"] != user.password:
        raise HTTPException(status_code=401, detail="Invalid password")

    return {
        "access_token": "dummy-token",
        "token_type": "bearer",
        "user": {
            "name": existing_user["name"],
            "email": existing_user["email"],
        }
    }

@app.post("/trip-planner")
async def trip_planner(request: TripPlanRequest):
    state_name = request.state.strip().lower()
    places = places_data.get(state_name)

    if not places:
        raise HTTPException(
            status_code=404,
            detail="This state is not available in our travel data yet."
        )

    if request.days > len(places):
        raise HTTPException(
            status_code=400,
            detail=f"Only {len(places)} place(s) are currently available for {request.state.strip()}. Please choose fewer days."
        )

    plan = []
    for i in range(request.days):
        plan.append({
            "day": i + 1,
            "place_name": places[i]["name"],
            "description": places[i]["description"],
        })

    return {
        "state": request.state.strip(),
        "days": request.days,
        "plan": plan
    }