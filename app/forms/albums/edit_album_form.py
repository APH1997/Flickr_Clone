from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class EditAlbumForm(FlaskForm):
    author_id = IntegerField("Author Id", validators=[DataRequired()])
    cover_photo = IntegerField("Cover Photo Id")
    photos = StringField('Photo Ids', validators=[DataRequired()])
    title = StringField('Album Title', validators=[DataRequired()])
    description = StringField('Description')
