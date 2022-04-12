from app.models import db, Tag


def seed_tags():

    tag1_user1 = Tag(title="main", user_id=1)
    tag2_user1 = Tag(title="other", user_id=1)

    db.session.add(tag1_user1)
    db.session.add(tag2_user1)

    db.session.commit()


def undo_tags():
    db.session.execute("TRUNCATE tags RESTART IDENTITY CASCADE;")
    db.session.commit()
