from .db import db, environment, SCHEMA, add_prefix_for_prod
from .album_photo import album_photos

class Album(db.Model):
    __tablename__ = 'albums'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cover_photo_url = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))

    author = db.relationship(
        "User",
        back_populates="albums"
    )

    album_photos = db.relationship(
        "Photo",
        secondary=album_photos,
        back_populates="photo_albums"
    )
