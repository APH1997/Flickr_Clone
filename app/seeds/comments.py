from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice

def seed_comments(users, pics):
    comment1 = Comment(
        photo = choice(pics),
        author = choice(users),
        content="Gee whiz!"
    )
    comment2 = Comment(
        photo = choice(pics),
        author = choice(users),
        content="Golly! What a view!"
    )
    comment3 = Comment(
        photo = choice(pics),
        author = choice(users),
        content="Holy toledo, this ROCKS!"
    )
    comment4 = Comment(
        photo = choice(pics),
        author = choice(users),
        content="Now, this? THIS is art"
    )
    comment5 = Comment(
        photo = choice(pics),
        author = choice(users),
        content="This picture launched me into a spiral of existential dread."
    )
    comment6 = Comment(
        photo = choice(pics),
        author = choice(users),
        content="google.com how to undelete system 32"
    )
    comment7 = Comment(
        photo = choice(pics),
        author = choice(users),
        content="Now I've seen a lotta pictures in my day, but this takes the cake"
    )
    comment8 = Comment(
        photo = choice(pics),
        author = choice(users),
        content="Neato"
    )
    comment9 = Comment(
        photo = choice(pics),
        author = choice(users),
        content="Does anyone else want to lick this picture?"
    )
    comment10 = Comment(
        photo = choice(pics),
        author = choice(users),
        content="I wish MY photos came out this good. Wow!"
    )

    all_comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10]
    add = [db.session.add(comment) for comment in all_comments]

    db.session.commit()
    return all_comments

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
