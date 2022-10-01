
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
    review = StringField('Reviews', validators=[DataRequired(message="Review content is required"), Length(max=3000, min=5, message='Name must be 6-2000 characters.')])
    stars = IntegerField('Stars', validators=[DataRequired(message="Star is required")])
