from .db import db, environment, SCHEMA, add_prefix_for_prod


comments = db.Table(
    'comments',
    db.Model.metadata,
    db.Column("id", db.Integer, primary_key=True),
    db.Column("author_id", db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column("photo_id", db.Integer, db.ForeignKey(add_prefix_for_prod('photos.id'))),
    db.Column("content", db.String(200), nullable=False)
)

if environment == "production":
    comments.schema = SCHEMA
