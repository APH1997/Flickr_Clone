from app.models import db, Photo, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
fake = Faker()
from datetime import date


def seed_photos():
    sunset1 = Photo(
        author_id=2,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/sunset_seed_1.webp',
        caption='Caught this beaut on the way to Zumba LOL',
        description='',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
    )
    sunset2 = Photo(
        author_id=2,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/sunset_seed_2.png',
        caption='Pastel Sunset',
        description='',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
    )
    sunset3 = Photo(
        author_id=2,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/sunset_seed_3.jpg',
        caption='Crispy Clouds Before Sunset',
        description='',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
    )

    space1 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/hubble_tarantula_nebula.jpg',
        caption="Hubble's New View of the Tarantula Nebula",
        description="The Tarantula Nebula is a large star-forming region of ionized hydrogen gas that lies 161,000 light-years from Earth in the Large Magellanic Cloud, and its turbulent clouds of gas and dust appear to swirl between the region's bright, newly formed stars.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
    )
    space2 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/andromeda.jpg',
        caption='Hubble Popped Off',
        description='The Andromeda Galaxy (also known as Messier 31, M31, NGC 224 and originally the Andromeda Nebula) is a barred spiral galaxy and is the closest major galaxy to the Milky Way',
        created_at=fake.date_between(start_date='-1y', end_date='today'),
    )
    space3 = Photo(
        author_id=3,
        aws_url='https://highrme-pics.s3.us-east-2.amazonaws.com/WR+124.png',
        caption='Wolf-Rayet 124',
        description="The luminous, hot star Wolf-Rayet 124 (WR 124) is prominent at the centre of the NASA/ESA/CSA James Webb Space Telescope's composite image combining near-infrared and mid-infrared wavelengths of light.",
        created_at=fake.date_between(start_date='-1y', end_date='today'),
    )

    all_pics = [sunset1, sunset2, sunset3, space1, space2, space3]

    added = [db.session.add(pic) for pic in all_pics]
    db.session.commit()

    return all_pics

def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM photos"))

    db.session.commit()
