from .db import db, add_prefix_for_prod, environment, SCHEMA

likes = db.Table(
    "likes",
    db.Model.metadata,
    db.Column("photo_id", db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id')), primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
)

if environment == "production":
    likes.schema = SCHEMA
