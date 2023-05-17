from app.models import db, Reply, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice

def seed_replies(comments, users):
    reply1 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "Well said"
    )
    reply2 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "Darn skippy"
    )
    reply3 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "How can you be so brave, yet so controversial?"
    )
    reply4 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "It's all Greek to me!"
    )
    reply5 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "Why won't you accept my friend request"
    )
    reply6 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "Haha!"
    )
    reply7 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "Golly, you think so?"
    )
    reply8 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "I don't agree, and quite frankly, your demeanor offends me"
    )
    reply9 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "first"
    )
    reply10 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "Has anyone tested the length validations on these replies?"
    )
    reply11 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "Me too!!!!"
    )
    reply12 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "I wouldn't go THAT far..."
    )
    reply13 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "tomato tomato, let's just enjoy the views"
    )
    reply14 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "Oh, not you again..."
    )
    reply15 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "^ This."
    )
    reply16 = Reply(
        author = choice(users),
        parent = choice(comments),
        content = "I'm calling the police"
    )

    all_replies = [reply1, reply2, reply3, reply4, reply5, reply6, reply7, reply8, reply9, reply10, reply11, reply12, reply13, reply14, reply15, reply16]

    added = [db.session.add(reply) for reply in all_replies]

    db.session.commit()


def undo_replies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM replies"))

    db.session.commit()
