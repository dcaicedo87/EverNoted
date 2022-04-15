from flask import Blueprint, jsonify
from app.models import db, Note
from app.forms.edit_note_form import EditNoteForm


note_extra_routes = Blueprint("notes_extra", __name__)

@note_extra_routes.route('/<int:note_id>', methods=['PUT'])
def edit_note(note_id):
    form = EditNoteForm()
    note = Note.query.get(form.data['id'])
    note.title = form.data["title"]
    note.content = form.data["content"]
    # note.user_id = form.data["user_id"]

    db.session.add(note)
    db.session.commit()
    return note.to_dict()

@note_extra_routes.route('/<int:note_id>/delete', methods=['DELETE'])
def delete_note(note_id):
    deleted_note = Note.query.filter(Note.id == note_id).first()
    db.session.delete(deleted_note)
    db.session.commit()
    # return {"deleted_note": deleted_note.to_dict()}
    return jsonify(deleted_note.id)

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
