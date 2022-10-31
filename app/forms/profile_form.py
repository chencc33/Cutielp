from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, NumberRange, Length

class ProfileForm(FlaskForm):
    firstName = StringField("First Name", validators=[DataRequired(message="First Name is required"), Length(max=15, message='First name must be less than 15 characters.')])
    lastName = StringField("Last Name", validators=[DataRequired(message="Last Name is required"), Length(max=15, message='Last name must be less than 15 characters.')])
    email = StringField("Email", validators=[DataRequired(message="Email is required")])
    city = StringField("City")
    state = StringField("State")
    zipcode = StringField("Zipcode")
    profileImage = StringField("Profile Image")
