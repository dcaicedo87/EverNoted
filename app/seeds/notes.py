from app.models import db, Note


def seed_notes():

    note_1 = Note(title="Thinking Out Loud", content="I was out about on a stroll and discovered how easy it is to think completely uninterrupted.", user_id=1, notebook_id=1)
    note_1a = Note(title="Daily Ideas", content="Thinking of working on the house, looks like it needs some attention.", user_id=1, notebook_id=1)
    note_1b = Note(title="Birthdays", content="Remember to get something special for Judy, her birthday is coming up soon.", user_id=1, notebook_id=1)

    note_2 = Note(title="Hello World!", content="I created a new Hello World program.. I'm becoming a master!", user_id=2, notebook_id=2)
    note_3 = Note(title="I need to keep organized", content="Discovering this app helps me stay focused.. write my thoughts here.", user_id=3, notebook_id=3)

    db.session.add(note_1)
    db.session.add(note_1a)
    db.session.add(note_1b)
    db.session.add(note_2)
    db.session.add(note_3)

    db.session.commit()

def undo_notes():
    db.session.execute("TRUNCATE notes RESTART IDENTITY CASCADE;")
    db.session.commit()
