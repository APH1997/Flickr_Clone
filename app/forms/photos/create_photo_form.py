from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS

class PhotoForm(FlaskForm):
    author_id = IntegerField("Author Id", validators=[DataRequired()])
    photo = FileField("Photo File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    caption = StringField('Caption')
    description = StringField('Description')
