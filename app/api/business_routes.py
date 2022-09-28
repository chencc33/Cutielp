from flask import Blueprint, request
from flask_login import login_required, current_user

from ..models import Business, Review, Image
from ..models.db import db

# from app.api.auth_routes import validation_errors_to_error_messages

business_routes = Blueprint('business', __name__)

# get all business
@business_routes.route('')
def get_all_business():
    businesses = Business.query.all()
    response = {business.id:business.to_dict() for business in businesses}
    return response

# get all business of current user
@business_routes.route('/current')
@login_required
def get_business_currentuser():
    user_id = current_user.id
    businesses = Business.query.filter(Business.owner_id == user_id)
    response = {business.id:business.to_dict() for business in businesses}
    return response

#get business detail by id
@business_routes.route('/<int:businessId>')
def get_business_by_id(businessId):
    business = Business.query.get(businessId)
    return business.to_dict()

# # create a business
# @business_routes.route('')
# @login_required
# def create_business():
