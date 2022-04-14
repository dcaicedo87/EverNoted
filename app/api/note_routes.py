from flask import Blueprint
from app.models import db, Note
from app.forms.edit_note_form import EditNoteForm


note_routes = Blueprint("notes", __name__)


@note_routes.route('/all')
def get_notes(user_id):
    notes = Note.query.filter(Note.user_id == user_id).all()
    return {"notes": [ note.to_dict() for note in notes ]}


@note_routes.route('/create', methods=['POST'])
def create_note(user_id):
    new_note = Note(title="Untitled", content="", user_id=user_id)
    db.session.add(new_note)
    db.session.commit()
    return new_note.to_dict()

@note_routes.route('/notes/<int:note_id>', methods=['GET'])
def edit_note(note_id):
    form = EditNoteForm()
    note = Note.query.get(form.data['id'])
    note.title = form.data["title"]
    note.content = form.data["content"]
    note.user_id = form.data["user_id"]

    db.session.add(note)
    db.session.commit()
    return note.to_dict()

# @note_routes.route('/notes/<int:note_id>/edit', methods=['PUT'])
# def edit_note(note_id):
#     form = EditNoteForm()
#     note = Note.query.get(form.data['id'])
#     note.title = form.data["title"]
#     note.content = form.data["content"]
#     note.user_id = form.data["user_id"]

#     db.session.add(note)
#     db.session.commit()
#     return note.to_dict()
