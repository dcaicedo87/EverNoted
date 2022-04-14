from .db import db
from sqlalchemy.sql import func


class Note(db.Model):
    __tablename__= "notes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey("notebooks.id", ondelete="CASCADE"))
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False) # ask david if timezone=True is needed...

    user = db.relationship("User", back_populates="notes")
    notebook = db.relationship("Notebook", back_populates="notes")
    tags = db.relationship("Tag", secondary="tag_notes_join", back_populates="notes")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "user_id": self.user_id,
            "notebook_id": self.notebook_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
