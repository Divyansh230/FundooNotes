from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.schemas.label_schema import LabelResponse
from typing import List

class NoteCreate(BaseModel):
    title:str
    content:str

class NoteUpdate(BaseModel):
    title:Optional[str]=None
    content:Optional[str]=None

class NoteResponse(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime
    updated_at: datetime
    labels: List[LabelResponse] = []

    class Config:
        orm_mode = True