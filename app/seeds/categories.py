from random import randint
from unicodedata import category
from app.models import db, Category

categories = ['Japanese', 'Cafe', 'American', 'Burger', 'Breakfast', 'Chinese']

def seed_category():
    category0 = Category(
            category=categories[0]
        )
    category1 = Category(
            category=categories[1]
        )
    category2 = Category(
        category=categories[2]
    )
    category3 = Category(
        category=categories[3]
    )
    category4 = Category(
        category=categories[4]
    )
    # for idx in range(len(categories)):
    #     category = Category(
    #         category=categories[idx]
    #     )
    db.session.add(category0)
    db.session.add(category1)
    db.session.add(category2)
    db.session.add(category3)
    db.session.add(category4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_category():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
