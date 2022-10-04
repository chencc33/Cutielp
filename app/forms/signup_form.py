from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    # username = StringField(
    #     'username', validators=[DataRequired(), username_exists])
    firstName = StringField('first name', validators=[DataRequired(Length(max=15, message='First name less than 15 characters.'))])
    lastName = StringField('last name', validators=[DataRequired(Length(max=15, message='Last name less than 15 characters.'))])
    email = StringField('email', validators=[DataRequired(message="Email is required"), user_exists])
    password = StringField('password', validators=[DataRequired(message="Password is required")])
