from random import randint
from unicodedata import category
from app.models import db, Category

categories = ['Japanese', 'Cafe', 'American', 'Burger', 'Breakfast', 'Chinese']

def seed_category():


    for idx in range(len(categories)):
        category = Category(
            category=categories[idx]
        )
        db.session.add(category)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_category():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
