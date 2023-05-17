from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Photo

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
    

# Edit Photo by Id

# Delete Photo by Id
