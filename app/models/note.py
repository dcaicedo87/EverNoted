from .db import db



class Note(db.Model):
    __tablename__= "notes"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    title = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey("notebooks.id", ondelete="CASCADE"), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False)
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False)



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
