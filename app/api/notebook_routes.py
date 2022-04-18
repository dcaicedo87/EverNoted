from flask import Blueprint, request
from app.models import db, Notebook, Note
from sqlalchemy.sql import func

notebook_routes = Blueprint("notebooks", __name__)

@notebook_routes.route('/<int:user_id>/all')
def get_notebooks(user_id):
    notebooks_list = Notebook.query.filter(Notebook.user_id == user_id).all()
    return {"notebooks": [ notebook.to_dict() for notebook in notebooks_list]}


@notebook_routes.route('/create', methods=['POST'])
def create_notebook():
    # print('PREDATA:')
    data = dict(request.json)
    # print('U ARE IN THE BACKEND ROUTE', data)
    newNotebook = Notebook(
        user_id = data["user_id"],
        title = data["title"]
    )

    db.session.add(newNotebook)
    db.session.commit()
    return newNotebook.to_dict()


@notebook_routes.route('/<int:notebook_id>/users/<int:user_id>', methods=['PUT'])
def edit_notebook(notebook_id, user_id):
    data = json.loads(request.data)
    notebook = Notebook.query.filter(Notebook.id == notebook_id).first()
    notebook.title = data['title']
    notebook.updated_at = func.now()

    db.session.commit()

    return notebook.to_dict()

@notebook_routes.route('/<int:notebook_id>/delete', methods=['DELETE'])
def delete_notebook(notebook_id):
    notebook = Notebook.query.filter(Notebook.id == notebook_id).first()

    db.session.delete(notebook)
    db.session.commit()

    return notebook.to_dict()

@notebook_routes.route('/<int:notebook_id>/all')
def get_notebook_notes(notebook_id):
    notebook_notes_list = Note.query.filter(Note.notebook_id == notebook_id).all()
    return {"notes": [ note.to_dict() for note in notebook_notes_list ]}
