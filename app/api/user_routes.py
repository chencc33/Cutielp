from cProfile import Profile
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User
from ..models.db import db
from ..forms.profile_form import ProfileForm
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

#edit the current user
@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):
    user = User.query.get(id)
    if user is None:
        return {'message': "User couldn't be found", "statusCode": 404}
    profile_form = ProfileForm()
    profile_form['csrf_token'].data = request.cookies['csrf_token']
    if profile_form.validate_on_submit():
        data = profile_form.data

        user.first_name=data['firstName']
        user.last_name=data['lastName']
        user.email=data['email']
        user.city=data['city']
        user.state=data['state']
        user.zipcode=data['zipcode']
        user.profile_image=data['profileImage']

        db.session.commit()
        return user.to_dict()
    return {"errors": validation_errors_to_error_messages(profile_form.errors)}, 401
