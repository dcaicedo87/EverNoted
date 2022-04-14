from .db import db
from sqlalchemy.sql import func



class Notebook(db.Model):
    __tablename__ = "notebooks"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)


    user = db.relationship("User", back_populates="notebooks")
    notes = db.relationship("Note", back_populates="notebook", order_by="desc(Note.updated_at)", cascade = "all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            'notes': {note.id:note.to_dict() for note in self.notes},
        }
