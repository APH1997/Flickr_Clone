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
    in a list of dictionaries WITH authors and comments;
    This route populates the home feed.
    """
    photos = Photo.query.all()
    return {'photos': [photo.to_dict() for photo in photos]}
# Get All Photos by User Id
# Get All Photos by Album Id
# Get Photo by Photo Id

# Post Photo

# Edit Photo by Id

# Delete Photo by Id
