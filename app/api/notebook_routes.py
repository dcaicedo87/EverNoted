from flask import Blueprint, request
from app.models import db, Notebook

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
