from flask import Blueprint, request
from flask_login import login_required, current_user

from ..forms.business_form import BusinessForm

from ..models import Business, Review, Image
from ..models.db import db

from .auth_routes import validation_errors_to_error_messages

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

# create a business
@business_routes.route('', methods=["POST"])
@login_required
def create_business():
    new_form = BusinessForm()
    new_form['csrf_token'].data = request.cookies['csrf_token']
    if new_form.validate_on_submit():
        new_business = Business(
            owner_id=new_form.data['ownerId'],
            name=new_form.data['name'],
            email=new_form.data['email'],
            website=new_form.data['website'],
            open=new_form.data['open'],
            close=new_form.data['close'],
            phone=new_form.data['phone'],
            address=new_form.data['address'],
            city=new_form.data['city'],
            state=new_form.data['state'],
            zipcode=new_form.data['zipcode'],
            description=new_form.data['description'],
            price_range=new_form.data['priceRange'],
        )
        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict()
    return {'errors': validation_errors_to_error_messages(new_form.errors)}, 401
