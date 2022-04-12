from app.models import db, Notebook


def seed_notebooks():

    notebook_1 = Notebook(user_id=1, title="New Notes")
    notebook_2 = Notebook(user_id=1, title="Interesting Ideas")
    notebook_3 = Notebook(user_id=1, title="Fun quotes")

    db.session.add(notebook_1)
    db.session.add(notebook_2)
    db.session.add(notebook_3)

    db.session.commit()


def undo_notebooks():
    db.session.execute("TRUNCATE notebooks RESTART IDENTITY CASCADE;")
    db.session.commit()
