from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

small_str = 15
med_str = 255
long_str = 2000

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(small_str), nullable=False)
    last_name = db.Column(db.String(small_str), nullable=False)
    email = db.Column(db.String(med_str), nullable=False, unique=True)
    hashed_password = db.Column(db.String(med_str), nullable=False)
    city = db.Column(db.String(small_str))
    state = db.Column(db.String(small_str))
    zipcode = db.Column(db.String, nullable=True)
    profile_image = db.Column(db.String(long_str), nullable=True)

    # Relationship
    businesses = db.relationship('Business', back_populates='user', cascade="all, delete")
    reviews = db.relationship('Review', back_populates='user', cascade="all, delete")
    images = db.relationship('Image', back_populates='user', cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'zipcode': self.zipcode,
            'profileImage':self.profile_image
        }
