from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice

def seed_albums(all_pics):
    space = Album(
        cover_photo_url = "https://highrme-pics.s3.us-east-2.amazonaws.com/hubble_tarantula_nebula.jpg",
        author_id = 3,
        title = "Spase Cace",
        description = "Twinkle twinkle little star, my oh my what wonders from afar",
        album_photos = [pic for pic in all_pics if pic.author_id==3]
    )

    sunsets = Album(
        cover_photo_url = "https://highrme-pics.s3.us-east-2.amazonaws.com/sunset_seed_2.png",
        author_id = 2,
        title = "Sunset Boulevard",
        description = "The VERY best sunsets my iPhone camera roll has to offer",
        album_photos = [pic for pic in all_pics if pic.author_id==2]
    )

    clouds = Album(
        cover_photo_url = choice([pic.aws_url for pic in all_pics if pic.author_id==5]),
        author_id = 5,
        title = "Please, Just Clouds",
        description = "Who doesn't like these fluffy beauts? I collected my best :)",
        album_photos = [pic for pic in all_pics if pic.author_id==5],
    )

    moon = Album(
        cover_photo_url = choice([pic.aws_url for pic in all_pics if pic.author_id==4]),
        author_id=4,
        title = "My Moon Collection",
        description = "Just sharing my work in progress. One day, I want to capture every phase.",
        album_photos = [pic for pic in all_pics if pic.author_id==4]
    )



    all_albums = [space, sunsets, clouds, moon]

    add = [db.session.add(album) for album in all_albums]
    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))

    db.session.commit()
