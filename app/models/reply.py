from .db import db, environment, SCHEMA, add_prefix_for_prod

class Reply(db.Model):
    __tablename__ = 'replies'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    parent_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('comments.id')))
    content = db.Column(db.String(200), nullable=False)

    author = db.relationship(
        "User",
        back_populates=""
    )

    parent = db.relationship(
        "Comment",
        back_populates="replies"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'author': self.author.to_dict(),
            'content': self.content
        }
