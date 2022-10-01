from operator import methodcaller
from flask import Blueprint, request
from flask_login import login_required, current_user

from ..models import Business, Review, Image
from ..models.db import db

# from app.api.auth_routes import validation_errors_to_error_messages

review_routes = Blueprint('review', __name__)

# get all reviews of current user
@review_routes.route('')
@login_required
def get_all_reviews_use():
    user_id = current_user.id
    reviews = Review.query.filter(Review.user_id == user_id)
    response = {review.id: review.to_dict() for review in reviews}
    return response

# get review by review Id
@review_routes.route('/<int:reviewId>')
def get_one_review(reviewId):
    review = Review.query.get(reviewId)
    return review.to_dict()

# delete a review
@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def delete_review(reviewId):
    review = Review.query.get(reviewId)
    if review is None:
        return {"message":"Review couldn't be found", "statusCode":404}
    db.session.delete(review)
    db.session.commit()
    return {"message": "Successfully deleted", "statusCode": 200}
