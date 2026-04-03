from fastapi import FastAPI
from app.database import db_instance
from app.routes.note_routes import router as note_router
from app.models import note,label,associations

## Table Creation
db_instance.get_base().metadata.create_all(bind=db_instance.get_engine())

app=FastAPI()

@app.get('/')
def read_root():
    return {'Hello':'World'}

app.include_router(note_router)