from fastapi import APIRouter,Depends,status
from typing import List
from sqlalchemy.orm import Session
from app.database import db_instance
from app.schemas.note_schema import NoteCreate,NoteUpdate,NoteResponse
from app.services.note_service import NoteService

router=APIRouter(prefix='/notes',tags=['Notes'])
note_service=NoteService()

## Create Routes
@router.post('/',response_model=NoteResponse,status_code=status.HTTP_201_CREATED)
def create_note(note_data:NoteCreate,db:Session=Depends(db_instance.get_db)):
    return note_service.create_note(note_data,db)


## Get all Notes
@router.get('/',response_model=List[NoteResponse])
def get_all_notes(db:Session=Depends(db_instance.get_db)):
    return note_service.get_all_notes(db)


## Get notes by id
@router.get('/{note_id}',response_model=NoteResponse)
def get_note_by_id(note_id:int,db:Session=Depends(db_instance.get_db)):
    return note_service.get_note_by_id(note_id,db)


## Update Note
@router.put('/{note_id}',response_model=NoteResponse)
def update_note(note_id:int,note_data:NoteUpdate,db:Session=Depends(db_instance.get_db)):
    return note_service.update_note(note_id,note_data,db)


## Delete Note
@router.delete('/{note_id}',response_model=NoteResponse)
def delete_note(note_id:int,db:Session=Depends(db_instance.get_db)):
    return note_service.delete_note(note_id,db)