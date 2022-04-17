from flask import Blueprint
from app.models import db, Notebook

notebook_routes = Blueprint("notebooks", __name__)

@notebook_routes.route('/<int:user_id>/all')
def get_notebooks(user_id):
    notebooks_list = Notebook.query.filter(Notebook.user_id == user_id).all()
    return {"notebooks": [ notebook.to_dict() for notebook in notebooks_list]}
