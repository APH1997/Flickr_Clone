from flask_wtf import FlaskForm
from wtforms import StringField


class UserBioForm(FlaskForm):
    bio = StringField('bio')
