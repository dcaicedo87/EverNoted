from app.models import db, Tag_Note_Join


def seed_tag_notes_join():

    tag1_note1 = Tag_Note_Join(tag_id=1, note_id=1)
    tag1_note2 = Tag_Note_Join(tag_id=1, note_id=2)
    tag2_note3 = Tag_Note_Join(tag_id=2, note_id=3)

    db.session.add(tag1_note1)
    db.session.add(tag1_note2)
    db.session.add(tag2_note3)

    db.session.commit()


def undo_tag_notes_join():
    db.session.execute("TRUNCATE tag_notes_join RESTART IDENTITY CASCADE;")
    db.session.commit()
