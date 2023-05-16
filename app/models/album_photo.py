from .db import db, add_prefix_for_prod, environment, SCHEMA


album_photos = db.Table(
    "album_photos",
    db.Model.metadata,
    db.Column("albums", db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), primary_key=True),
    db.Column("photos", db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), primary_key=True),
)

if environment == "production":
    album_photos.schema = SCHEMA
