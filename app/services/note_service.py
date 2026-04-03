from app.models.note import Note
from app.utils.logger import logger_instance
from fastapi import HTTPException
from app.models.label import Label
## Class for note service
class NoteService:
    def create_note(self,note_data,db):
        try:
            new_Note=Note(
                title=note_data.title,
                content=note_data.content
            )
            db.add(new_Note)
            db.commit()
            db.refresh(new_Note)

            logger_instance.info('Notes create SuccessFully')
            return new_Note
        except Exception as e:
            db.rollback()
            logger_instance.error(f"Error creating note: {e}")
            raise HTTPException(status_code=500,detail=str(e))

    ## Function for getting the notes
    def get_all_notes(self,db):
        notes=db.query(Note).all()
        return notes


    ## Function for getting the notes by id
    def get_note_by_id(self,note_id,db):
       note=db.query(Note).filter(Note.id==note_id).first()
       if not note:
           raise HTTPException(status_code=404,detail="Note not found")
       return note  


    ## Function for updating the notes
    def update_note(self,note_id,note_data,db):
        note=self.get_note_by_id(note_id,db)

        if not note:
            raise HTTPException(status_code=404,detail="Note not found")

        note.title=note_data.title
        note.content=note_data.content
        db.commit()
        db.refresh(note)

        logger_instance.info('Note updated successfully')
        return note


    ## Function for deleting the notes
    def delete_note(self,note_id,db):
        note=self.get_note_by_id(note_id,db)

        if not note:
            raise HTTPException(status_code=404,detail="Note not found")

        db.delete(note)
        db.commit()

        logger_instance.info('Note deleted successfully')
        return {'mssge':'Note deleted successfully'}
        

    def add_label_to_note(self,note_id,label_id,db):
        note=self.get_note_by_id(note_id,db)
        label=db.query(Label).filter(Label.id==label_id).first()
        if not label:
            raise HTTPException(status_code=404,detail='Label not found')

        
        if not note or not label:
            raise HTTPException(status_code=404,detail="Note or Label not found")

        note.labels.append(label)
        db.commit()
        db.refresh(note)

        logger_instance.info('Label added to note successfully')
        return note


    def remove_label_from_note(self,note_id,label_id,db):
        note=self.get_note_by_id(note_id,db)
        label=db.query(Label).filter(Label.id==label_id).first()
        if not label:
            raise HTTPException(status_code=404,detail='Label not found')

        
        if not note or not label:
            raise HTTPException(status_code=404,detail="Note or Label not found")

        note.labels.remove(label)
        db.commit()
        db.refresh(note)

        logger_instance.info('Label removed from note successfully')
        return note


    def get_note_with_label(self,note_id,db):
        note=db.query(Note).filter(Note.id==note_id).first()
        if not note:
            raise HTTPException(status_code=404,detail='Note not found')
        return note
