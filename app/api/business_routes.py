import re
from flask import Blueprint, request
from flask_login import login_required, current_user
from sqlalchemy.sql import func

from ..forms.business_form import BusinessForm
from ..forms.review_form import ReviewForm

from ..models import Business, Review, Image
from ..models.db import db

from .auth_routes import validation_errors_to_error_messages

business_routes = Blueprint('business', __name__)

# get all business
@business_routes.route('')
def get_all_business():
    businesses = Business.query.all()
    response = {business.id:business.to_dict() for business in businesses}
    for id in response:
        business = response[id]
        images = Image.query.filter(Image.business_id == id)
        business['Images'] = [image.to_dict() for image in images]
        reviews = Review.query.filter(Review.business_id == id)
        if reviews:
            business['Reviews'] = [review.to_dict() for review in reviews]
            numReview = len(business['Reviews'])
            avgStar = sum([review['stars'] for review in business['Reviews']])
            business['numReview'] = numReview
            business['avgStar'] = round(avgStar/numReview, 1) if numReview else 0
    return response

# get all business of current user
@business_routes.route('/current')
@login_required
def get_business_currentuser():
    user_id = current_user.id
    businesses = Business.query.filter(Business.owner_id == user_id)
    response = {business.id:business.to_dict() for business in businesses}
    for id in response:
        business = response[id]
        images = Image.query.filter(Image.business_id == id)
        business['Images'] = [image.to_dict() for image in images]
        reviews = Review.query.filter(Review.business_id == id)
        if reviews:
            business['Reviews'] = [review.to_dict() for review in reviews]
            numReview = len(business['Reviews'])
            avgStar = sum([review['stars'] for review in business['Reviews']])
            business['numReview'] = numReview
            business['avgStar'] = round(avgStar/numReview, 1) if numReview else 0
    return response

#get business detail by id
@business_routes.route('/<int:businessId>')
def get_business_by_id(businessId):
    businessQuery = Business.query.get(businessId)
    business = businessQuery.to_dict()
    images = Image.query.filter(Image.business_id == businessId)
    business['Images'] = [image.to_dict() for image in images]
    reviews = Review.query.filter(Review.business_id == businessId)
    if reviews:
        business['Reviews'] = [review.to_dict() for review in reviews]
        numReview = len(business['Reviews'])
        avgStar = sum([review['stars'] for review in business['Reviews']])
        business['numReview'] = numReview
        business['avgStar'] = round(avgStar/numReview, 1) if numReview else 0
    return business


# create a business
@business_routes.route('', methods=["POST"])
@login_required
def create_business():
    new_form = BusinessForm()
    new_form['csrf_token'].data = request.cookies['csrf_token']
    if new_form.validate_on_submit():
        new_business = Business(
            owner_id=current_user.id,
            name=new_form.data['name'],
            # email=new_form.data['email'],
            website=new_form.data['website'],
            open=new_form.data['open'],
            close=new_form.data['close'],
            phone=new_form.data['phone'],
            address=new_form.data['address'],
            city=new_form.data['city'],
            state=new_form.data['state'],
            zipcode=new_form.data['zipcode'],
            description=new_form.data['description'],
            price_range=new_form.data['priceRange']
        )
        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict()
    return {'errors': validation_errors_to_error_messages(new_form.errors)}, 401

# edit a business
@business_routes.route('/<int:businessId>', methods=['PUT'])
@login_required
def update_business(businessId):
    business = Business.query.get(businessId)
    if business is None:
        return {"message":"Business couldn't be found", "statusCode":404}
    business_form = BusinessForm()
    business_form['csrf_token'].data = request.cookies['csrf_token']

    if business_form.validate_on_submit():
        data = business_form.data

        business.owner_id=current_user.id
        business.name=data['name']
        # business.email=data['email']
        business.website=data['website']
        business.open=data['open']
        business.close=data['close']
        business.phone=data['phone']
        business.address=data['address']
        business.city=data['city']
        business.state=data['state']
        business.zipcode=data['zipcode']
        business.description=data['description']
        business.price_range=data['priceRange']

        db.session.commit()
        return business.to_dict()
    return {"errors": validation_errors_to_error_messages(business_form.errors)}, 401

# delete a business
@business_routes.route('/<int:businessId>', methods=['DELETE'])
@login_required
def delete_task(businessId):
    business = Business.query.get(businessId)
    if business is None:
        return {"message":"Business couldn't be found", "statusCode":404}
    db.session.delete(business)
    db.session.commit()
    return {"message": "Successfully deleted", "statusCode": 200}

# get all reviews of a business id
@business_routes.route('/<int:businessId>/reviews')
def get_all_reviews_business(businessId):
    reviews = Review.query.filter(Review.business_id == businessId)
    response = {review.id: review.to_dict() for review in reviews}
    return response

# create a review for a business
@business_routes.route('/<int:businessId>/reviews', methods=['POST'])
@login_required
def create_review(businessId):
    new_form = ReviewForm()
    userId = current_user.id
    new_form['csrf_token'].data = request.cookies['csrf_token']
    if new_form.validate_on_submit():
        new_review = Review(
            review=new_form.data['review'],
            stars=new_form.data['stars'],
            user_id=userId,
            business_id=businessId
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(new_form.errors)}, 401

# edit a review
@business_routes.route('/<int:businessId>/reviews/<int:reviewId>', methods=['PUT'])
@login_required
def update_review(businessId, reviewId):
    userId = current_user.id
    target_review = Review.query.get(reviewId)
    if target_review is None:
        return {"message":"Review couldn't be found", "statusCode":404}
    review_form = ReviewForm()
    review_form['csrf_token'].data = request.cookies['csrf_token']

    if review_form.validate_on_submit():
        data = review_form.data

        target_review.review=data['review']
        target_review.stars=data['stars']
        target_review.user_id=userId
        target_review.business_id=businessId

        db.session.commit()
        return target_review.to_dict()
    return {"errors": validation_errors_to_error_messages(review_form.errors)}, 401
