from typing import Optional

from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Item(BaseModel):
    make: str
    model: str
    price: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/item")
def create_item(item: Item):
    json_compatible_item_data = jsonable_encoder({"res": "ok"})
    return JSONResponse(content=json_compatible_item_data)
