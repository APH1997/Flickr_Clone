from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User
from app.forms import EditUserForm, UserBioForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict_with_pics()

@user_routes.route('/<int:id>/edit', methods=["PUT"])
@login_required
def edit_user(id):
    """
    Queries for user by id, instantiates flask form,
    checks for new cover photo or new pro pic
    updates applicable properties with form data
    """
    form = EditUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User.query.get(id)

        new_username = form.data["username"]
        new_first = form.data["first_name"]
        new_last = form.data["last_name"]
        cover_photo = form.data["cover_photo"]
        profile_pic = form.data["profile_pic"]

        if cover_photo:
            cover_photo.filename = get_unique_filename(cover_photo.filename)
            upload = upload_file_to_s3(cover_photo)

            if "url" not in upload:
                return upload["errors"]

            cover_url = upload["url"]
            user.cover_photo_url = cover_url

        if profile_pic:
            profile_pic.filename = get_unique_filename(profile_pic.filename)
            upload = upload_file_to_s3(profile_pic)

            if "url" not in upload:
                return upload["errors"]

            profile_pic_url = upload["url"]
            user.profile_image_url = profile_pic_url


        if new_first:
            user.first_name = new_first
        if new_last:
            user.last_name = new_last
        if new_username:
            user.username = new_username

        db.session.commit()
        return user.to_dict_with_pics()

    else:
        return form.errors, 400

@user_routes.route('/<int:id>/bio/edit', methods=["PUT"])
@login_required
def set_bio(id):
    form = UserBioForm()
    if form.validate_on_submit():
        user = User.query.get(id)
        user.bio = form.data["bio"]
        db.session.commit()
        
        return user.to_dict_with_pics()

    else:
        return form.errors
