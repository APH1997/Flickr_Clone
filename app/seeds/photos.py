from app.models import db, Photo, environment, SCHEMA
from sqlalchemy.sql import text

def seed_photos():
    sunset1 = Photo(
        author_id=2, aws_url='', caption='Caught this beaut on the way to Zumba', description=''
    )
    sunset2 = Photo(
        author_id=2, aws_url='', caption='Caught this beaut on the way to Zumba', description=''
    )
    sunset3 = Photo(
        author_id=2, aws_url='', caption='Caught this beaut on the way to Zumba', description=''
    )

    space1 = Photo(
        author_id=3, aws_url='', caption='Caught this beaut on the way to Zumba', description=''
    )
    space1 = Photo(
        author_id=3, aws_url='', caption='Caught this beaut on the way to Zumba', description=''
    )
    space1 = Photo(
        author_id=3, aws_url='', caption='Caught this beaut on the way to Zumba', description=''
    )
