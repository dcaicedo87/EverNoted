from flask import Blueprint
from app.models import db, Note


note_routes = Blueprint("notes", __name__)


@note_routes.route('/<int:id>/all')
def getNotes(id):
    notes = Note.query.filter(Note.user_id == id).all()
    return {"notes": [ note.to_dict() for note in notes ]}
