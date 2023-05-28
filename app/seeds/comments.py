from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice

def seed_comments(users, pics):

    generic_comments = [
        'Oh YEAH!!',
        'Hey did Flickr get rid of ads?',
        'Stupendous',
        "I don't know who I'm more jealous of; you, or the camera!",
        "qerfjfapjs sorry cat on keyboard LOL",
        "I'm gonna email this to my grandson!",
        "I feel like a new man after seeing this!",
        "Good eye",
        "ChatGPT can't compete",
        "Blast off!!!",
        "Cowwabunga ROFL",
        "Houston, we have a problem",
        "Mid",
        "Hey, how do I use emojies on here?",
        "Can't believe I verify my bank pin to sign up for this",
        "I did NOT expect this picture to go so hard",
        "These colors remind me of grandpa. Miss ya, peepaw",
        "Gee whiz!",
        "Golly! What a view!",
        "Holy toledo, this ROCKS!",
        "Now, this? THIS is art",
        "This picture launched me into a spiral of existential dread.",
        "google.com how to undelete system 32",
        "Now I've seen a lotta pictures in my day, but this takes the cake",
        "Neato",
        "Does anyone else want to lick this picture?",
        "I wish MY photos came out this good. Wow!",
        "This sight might not look great, but the developer sure knows what they're doing!",
        "Good job!",
        "My brain literally cannot comprehend this",
        "Oh?",
        "First",
        "I'll drink to that",
        "Reminds me of the first time I licked a 9v battery lol",
        "I almost get swept out to sea when I was little. My dad rescued me.",
        "Get this person a raise",
        "Did an AI make this?",
        "Really? In this economy? Yeah right, buster.",
        "oh, I forgot what I was going to say",
    ]

    all_comments = [Comment(
        photo = choice(pics),
        author = choice(users),
        content = comment
    ) for comment in generic_comments]


    add = [db.session.add(comment) for comment in all_comments]

    db.session.commit()
    return all_comments

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
