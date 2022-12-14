
# from turtle import back

from email.policy import default
from flask_sqlalchemy import SQLAlchemy
from .db import db

small_str = 15
med_str = 255
long_str = 2000


class Category(db.Model):
  __tablename__ = 'categories'

  id = db.Column(db.Integer, primary_key=True)
  category = db.Column(db.String(small_str), nullable=False)

  #Relationship
  businesses = db.relationship('Business', back_populates='category', cascade="all, delete")

  def to_dict(self):
    return {
    "id": self.id,
    "category": self.category
  }

class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    name = db.Column(db.String(med_str), nullable=False)
    open = db.Column(db.String(small_str), nullable=False)
    close = db.Column(db.String(small_str), nullable=False)
    phone = db.Column(db.String(small_str), nullable=False)
    address = db.Column(db.String(med_str), nullable=False)
    city = db.Column(db.String(small_str), nullable=False)
    state = db.Column(db.String(small_str), nullable=False)
    zipcode = db.Column(db.String(small_str), nullable=False)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    description = db.Column(db.String(long_str), nullable=False)
    price_range = db.Column(db.Integer, nullable=False)
    preview_image = db.Column(db.String(long_str), nullable=False)

    #Relationship
    user = db.relationship('User', back_populates='businesses')
    category = db.relationship('Category', back_populates='businesses')
    images = db.relationship('Image', back_populates='business', cascade="all, delete")
    reviews = db.relationship('Review', back_populates='business', cascade="all, delete")

    def to_dict(self):
        return {
        "id": self.id,
        "ownerId":self.owner_id,
        "name": self.name,
        "open": self.open,
        "close": self.close,
        "phone": self.phone,
        "address": self.address,
        "city": self.city,
        "state": self.state,
        "zipcode": self.zipcode,
        "lat":self.lat,
        "lng":self.lng,
        "description": self.description,
        "priceRange": self.price_range,
        "previewImage":self.preview_image,
        "categoryId":self.category_id,
        "categoryName":self.category.category
      }

class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String(long_str))
    stars = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))

    #Relationship
    user = db.relationship('User', back_populates='reviews')
    images = db.relationship('Image', back_populates='review', cascade="all, delete")
    business = db.relationship('Business', back_populates='reviews')

    def to_dict(self):
        return {
        "id": self.id,
        "review": self.review,
        "stars": self.stars,
        "userId": self.user_id,
        "businessId": self.business_id,
        'images':[image.to_dict() for image in self.images],
        "user": self.user.to_dict(),
        "businessName":self.business.name
      }

class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(long_str), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    review_id = db.Column(db.Integer, db.ForeignKey('reviews.id'))

    # Relationship
    user = db.relationship('User', back_populates='images')
    business = db.relationship('Business', back_populates='images')
    review = db.relationship('Review', back_populates='images')

    def to_dict(self):
        return {
        "id": self.id,
        "url": self.url,
        "userId": self.user_id,
        "businessId": self.business_id,
        "reviewId": self.review_id
      }
