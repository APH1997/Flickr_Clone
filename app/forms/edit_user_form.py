from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import User
from app.api.aws_helpers import ALLOWED_EXTENSIONS

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class EditUserForm(FlaskForm):
    username = StringField('username', validators=[username_exists])
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    cover_photo = FileField("Cover Photo", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    profile_pic = FileField("Profile Picture", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
