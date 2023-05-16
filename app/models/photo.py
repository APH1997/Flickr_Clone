from .db import db, environment, SCHEMA, add_prefix_for_prod

class Photo(db.Model):
    __tablename__ = 'photos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id =db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    aws_url = db.Column(db.String, nullable=False)
    caption = db.Column(db.String(100))
    description = db.Column(db.String)

    author = db.relationship(
        "User",
        back_populates="photos"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'author': self.author.to_dict(),
            'url': self.aws_url,
            'caption': self.caption,
            'description': self.description
        }

    def to_dict_no_author(self):
        return {
            'id': self.id,
            'url': self.aws_url,
            'caption': self.caption,
            'description': self.description
        }
