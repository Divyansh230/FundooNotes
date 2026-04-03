from pydatic import BaseModel

class LabelCreate(BaseModel):
    name:str

class LabelUpdate(BaseModel):
    name:str

class LabelResponse(BaseModel):
    id:int
    name:str

    class Config:
        orm_mode=True
