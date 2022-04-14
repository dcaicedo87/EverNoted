from flask import Blueprint
from app.models import db, Note


note_routes = Blueprint("notes", __name__)


@note_routes.route('/all')
def get_notes(user_id):
    notes = Note.query.filter(Note.user_id == user_id).all()
    return {"notes": [ note.to_dict() for note in notes ]}


@note_routes.route('/create', methods=['POST'])
def create_note(user_id):
    new_note = Note(title="Untitled", content="", user_id=user_id, notebook_id=0)
    db.session.add(new_note)
    db.session.commit()
    return new_note.to_dict()
