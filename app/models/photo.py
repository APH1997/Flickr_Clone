from .db import db, environment, SCHEMA, add_prefix_for_prod
from .album_photo import album_photos
from datetime import datetime

class Photo(db.Model):
    __tablename__ = 'photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    aws_url = db.Column(db.String, nullable=False)
    caption = db.Column(db.String(100))
    description = db.Column(db.String(500))
    created_at = db.Column(db.Date, default=datetime.today)

    author = db.relationship(
        "User",
        back_populates="photos"
    )

    comments = db.relationship(
        "Comment",
        back_populates="photo",
        cascade='delete-orphan, all'
    )

    photo_albums = db.relationship(
        "Album",
        secondary=album_photos,
        back_populates="album_photos"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'author': self.author.to_dict(),
            'url': self.aws_url,
            'caption': self.caption,
            'description': self.description,
            'comments': [comment.to_dict_no_photo() for comment in self.comments],
            'albums' : [album.to_dict_no_pics_no_author() for album in self.photo_albums],
            'created_at': self.created_at
        }

    def to_dict_no_author(self):
        return {
            'id': self.id,
            'url': self.aws_url,
            'authorId': self.author.id,
            'caption': self.caption,
            'description': self.description,
            'created_at': self.created_at
        }
