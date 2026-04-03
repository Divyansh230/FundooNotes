from sqlalchemy import Table,Column,Integer,String,Boolean,DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base
from app.models.associations import NoteLabelAssociation

class Note(Base):
    __tablename__='notes'
    id=Column(Integer,primary_key=True,index=True)
    title=Column(String(255),nullable=False)
    content=Column(String(1000),nullable=False)
    created_at=Column(DateTime,default=datetime.utcnow)
    updated_at=Column(DateTime,default=datetime.utcnow,onupdate=datetime.utcnow)
    
    labels=relationship(
        'Label',
        secondary=NoteLabelAssociation.note_label,
        back_populates='notes'
    )