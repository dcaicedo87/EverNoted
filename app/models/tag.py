from .db import db


class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    user = db.relationship("User", back_populates="tags")
    notes = db.relationship("Note", secondary="tag_notes_join", back_populates="tags")

    def to_dict(self):
        return {
            "id": self.id,
            "title" self.title,
            "user_id": self.user_id
        }
