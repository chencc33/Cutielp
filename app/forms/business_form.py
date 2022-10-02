from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, NumberRange, Length

small_str = 15
med_str = 255
long_str = 2000

class BusinessForm(FlaskForm):
    # ownerId = IntegerField('Owner', validators=[DataRequired()])
    name = StringField("Name")
    # email = StringField("Email", validators=[DataRequired(message="Email is required"), Length(max=med_str, message='Email must be less than 255 characters.')])
    website = StringField("Website")
    open = StringField("Open", validators=[DataRequired(message="Open time is required"), Length(max=small_str, message='Open time must be less than 15 characters.')])
    close = StringField("Close", validators=[DataRequired(message="Close time is required"), Length(max=small_str, message='Close time must be less than 15 characters.')])
    phone = StringField("Phone", validators=[DataRequired(message="Phone number is required"), Length(max=small_str, message='Phone number must be less than 15 characters.')])
    address = StringField("Address", validators=[DataRequired(message="Address is required"), Length(max=med_str, message='Address must be less than 255 characters.')])
    city = StringField("City", validators=[DataRequired(message="City is required"), Length(max=small_str, message='City must be less than 15 characters.')])
    state = StringField("State", validators=[DataRequired(message="State is required"), Length(max=small_str, message='State must be less than 15 characters.')])
    zipcode = StringField("Zipcode", validators=[DataRequired(message="zipcode is required"), Length(max=small_str, message='Zipcode must be less than 15 characters.')])
    description = StringField("Description", validators=[DataRequired(message="Description is required"), Length(max=long_str, message='Description must be less than 2000 characters.')])
    priceRange = IntegerField("Price Range", validators=[DataRequired(message="Price Range is required"), NumberRange(min=1, max=5, message='Price range must in range 1 to 5.')])
    # previewImage = StringField("Preview Image")
