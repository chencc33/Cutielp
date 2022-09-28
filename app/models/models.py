
# from turtle import back

from flask_sqlalchemy import SQLAlchemy
from .db import db

small_str = 15
med_str = 255
long_str = 2000

class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    name = db.Column(db.String(med_str), nullable=False, unique=True)
    email = db.Column(db.String(med_str), nullable=False, unique=True)
    website = db.Column(db.String(med_str))
    open = db.Column(db.String(small_str), nullable=False)
    close = db.Column(db.String(small_str), nullable=False)
    phone = db.Column(db.String(small_str), nullable=False)
    address = db.Column(db.String(med_str), nullable=False)
    city = db.Column(db.String(small_str), nullable=False)
    state = db.Column(db.String(small_str), nullable=False)
    zipcode = db.Column(db.String(small_str), nullable=False)
    description = db.Column(db.String(long_str), nullable=False)
    price_range = db.Column(db.Integer, nullable=False)

    #Relationship
    owner = db.relationship('User', back_populates='businesses')
    images = db.relationship('Image', back_populates='business_image', cascade="all, delete")
    reviews = db.relationship('Review', back_populates='business_review', cascade="all, delete")


    def to_dict(self):
        return {
        "id": self.id,
        "ownerId":self.owner_id,
        "name": self.name,
        "email": self.email,
        "website": self.website,
        "open": self.open,
        "close": self.close,
        "phone": self.phone,
        "address": self.address,
        "city": self.city,
        "state": self.state,
        "zipcode": self.zipcode,
        "description": self.description,
        "priceRange": self.price_range
      }

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(long_str))
    stars = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))

    #Relationship
    review_user = db.relationship('User', back_populates='reviews')
    images = db.relationship('Image', back_populates='review_image', cascade="all, delete")
    business_review = db.relationship('Business', back_populates='reviews')

    def to_dict(self):
        return {
        "id": self.id,
        "review": self.review,
        "stars": self.stars,
        "userId": self.user_id,
        "businessId": self.business_id
      }

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(long_str), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'))

    # Relationship
    user_image = db.relationship('User', back_populates='images')
    business_image = db.relationship('Business', back_populates='images')
    review_image = db.relationship('Review', back_populates='images')

    def to_dict(self):
        return {
        "id": self.id,
        "url": self.url,
        "userId": self.user_id,
        "businessId": self.business_id,
        "reviewId": self.review_id
      }
