from .db import db


class Tag_Note_Join(db.Model):
    __tablename__ = "tag_notes_join"

    id = db.Column(db.Integer, primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey("tags.id", ondelete="CASCADE"), nullable=False)
    note_id = db.Column(db.Integer, db.ForeignKey("notes.id", ondelete="CASCADE"), nullable=False)
    dummy_column = db.Column(db.String)


    def to_dict(self):
        return {
            "id": self.id,
            "note_id": self.note_id,
            "tag_id": self.tag_id
        }
