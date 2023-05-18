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
    description = db.Column(db.String(500))

    author = db.relationship(
        "User",
        back_populates="albums"
    )

    album_photos = db.relationship(
        "Photo",
        secondary=album_photos,
        back_populates="photo_albums"
    )

    def to_dict(self):
        return {
        'id': self.id,
        'title': self.title,
        'description': self.description,
        'cover_photo': self.cover_photo_url,
        'author': self.author.to_dict(),
        'pics': [photo.to_dict_no_author for photo in self.album_photos]
        }

    def to_dict_no_pics_no_author(self):
        return {
        'id': self.id,
        'title': self.title,
        'description': self.description,
        'cover_photo': self.cover_photo_url
        }
