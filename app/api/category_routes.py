from crypt import methods
from flask import Blueprint, request

from app.models.models import Category
from ..models import Business
from ..models.db import db

from .auth_routes import validation_errors_to_error_messages

category_routes = Blueprint('category', __name__)

# get all categories
@category_routes.route('/all')
def get_all_categories():
    categoreis = Category.query.all()
    response = [category.to_dict() for category in categoreis]
    return response

# get all business of a category:
@category_routes.route('/<int:categoryId>/businesses')
def get_all_business_by_category(categoryId):
    businesses = Business.query.filter(Business.category_id == categoryId)
    response = {business.id: business.to_dict() for business in businesses}
    return response
