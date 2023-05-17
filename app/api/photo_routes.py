from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Photo
from forms import PhotoForm, EditPhotoForm
from app.api.aws_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3

photo_routes = Blueprint('photos', __name__)

# Get All Photos
@photo_routes.route('/all')
@login_required
def all_photos():
    """
    Query for all photos and returns them
    in a list of dictionaries WITH authors, comments, and albums;
    This route populates the home feed.
    """
    photos = Photo.query.all()
    return {'photos': [photo.to_dict() for photo in photos]}


# Get All Photos by User Id
@photo_routes.route('/user/<int:userId>')
@login_required
def all_user_photos(userId):
    """
    Query for all photos where author_id == userId
    This route populates a user page's photo stream tab
    """
    photos = Photo.query.filter(Photo.author_id == userId).all()
    return {'photos': [photo.to_dict() for photo in photos]}


# Get Photo by Photo Id
@photo_routes.route('/<int:photoId>')
@login_required
def get_photo_by_id(photoId):
    """
    Query for one photo by it's Id
    Return in a dictionary with comments, albums, author
    """
    photo = Photo.query.get(photoId)
    return photo.to_dict()

# Post Photo
@photo_routes.route('/new', methods=['POST'])
@login_required
def post_photo():
    """
    Takes form data, validates against FlaskForm
    If succesful, uploads to AWS and returns new photo.to_dict_no_author()
    If fail, return error dictionary
    """
    form = PhotoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        photo = form.data["photo"]
        photo.filename = get_unique_filename(photo.filename)
        upload = upload_file_to_s3(photo)

        if "url" not in upload:
            return upload["errors"]

        photo_url = upload["url"]

        new_photo = Photo(
            author_id = form.data["author_id"],
            aws_url = photo_url,
            caption = form.data["caption"],
            description = form.data["description"]
        )

        db.session.add(new_photo)
        db.session.commit()
        return jsonify(new_photo.to_dict())
    else:
        return jsonify({"errors": form.errors})

# Edit Photo by Id
@photo_routes.route('/<int:photoId>/edit', methods=['PUT'])
@login_required
def edit_photo(photoId):
    """
    Takes form data, validates against Flask Form
    Queries for photo and updates attributes
    If there is a photo submitted with edit form,
    removes current photo from bucket and uploads given photo
    """
    form = EditPhotoForm()
    if form.validate_on_submit():
        target_photo = Photo.query.get(photoId)

        if form.data["photo"] is not None:
            photo = form.data["photo"]
            photo.filename = get_unique_filename(photo.filename)
            upload = upload_file_to_s3(photo)

            if "url" not in upload:
                return upload["errors"]

            new_photo_url = upload["url"]

            #Upload succeeded, we can remove old photo
            remove_file_from_s3(target_photo.aws_url)

            target_photo.aws_url = new_photo_url

        target_photo.caption = form.data["caption"]
        target_photo.description = form.data["description"]

        db.session.commit()

        return jsonify(target_photo.to_dict())
    else:
        return jsonify({"errors": form.errors})

# Delete Photo by Id
