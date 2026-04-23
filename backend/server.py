from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

messages_col = db["messages"]
stats_col = db["stats"]

app = FastAPI(title="Chaitash Portfolio API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class MessageIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)


class MessageOut(BaseModel):
    id: str
    name: str
    email: str
    message: str
    created_at: datetime


class StatsOut(BaseModel):
    visits: int = 0
    downloads: int = 0
    messages: int = 0


# ---------- Helpers ----------
async def _ensure_stats_doc():
    await stats_col.update_one(
        {"_id": "global"},
        {"$setOnInsert": {"_id": "global", "visits": 0, "downloads": 0}},
        upsert=True,
    )


async def _bump(field: str) -> int:
    await _ensure_stats_doc()
    doc = await stats_col.find_one_and_update(
        {"_id": "global"},
        {"$inc": {field: 1}},
        return_document=True,
    )
    return int(doc.get(field, 0)) if doc else 0


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Chaitash Portfolio API"}


@api_router.post("/contact", response_model=dict)
async def create_message(payload: MessageIn):
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": str(payload.email).strip(),
        "message": payload.message.strip(),
        "created_at": datetime.utcnow(),
    }
    await messages_col.insert_one(doc)
    return {"id": doc["id"], "ok": True, "created_at": doc["created_at"].isoformat()}


@api_router.get("/contact", response_model=List[MessageOut])
async def list_messages():
    cur = messages_col.find({}, {"_id": 0}).sort("created_at", -1).limit(500)
    items = []
    async for d in cur:
        items.append(
            MessageOut(
                id=d["id"],
                name=d["name"],
                email=d["email"],
                message=d["message"],
                created_at=d["created_at"],
            )
        )
    return items


@api_router.post("/stats/visit")
async def bump_visit():
    visits = await _bump("visits")
    return {"visits": visits}


@api_router.post("/stats/resume-download")
async def bump_download():
    downloads = await _bump("downloads")
    return {"downloads": downloads}


@api_router.get("/stats", response_model=StatsOut)
async def get_stats():
    await _ensure_stats_doc()
    s = await stats_col.find_one({"_id": "global"}) or {}
    msg_count = await messages_col.count_documents({})
    return StatsOut(
        visits=int(s.get("visits", 0)),
        downloads=int(s.get("downloads", 0)),
        messages=int(msg_count),
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
