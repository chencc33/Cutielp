from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo',
        last_name='User',
        email='demo@user.io',
        password='password',
        city='Tucson',
        state='AZ',
        zipcode='85705',
        profile_image='https://i.pravatar.cc/150?img=1'
    )
    user2 = User(
        first_name='Wade',
        last_name='Adams',
        email='epeeist@yahoo.ca',
        password='K65YnHG',
        city='Eden Prairie',
        state='MN',
        zipcode='55347',
        profile_image='https://i.pravatar.cc/150?img=2'
    )
    user3 = User(
        first_name='Dave',
        last_name='Wilson',
        email='sharon@att.net',
        password='zuKtc7c',
        city='Boston',
        state='MA',
        zipcode='52127',
        profile_image='https://i.pravatar.cc/150?img=3'
    )
    user4 = User(
        first_name='Seth',
        last_name='Abbe',
        email='jschauma@yahoo.ca',
        password='wGne4ZT',
        city='Holland',
        state='MI',
        zipcode='49423',
        profile_image='https://i.pravatar.cc/150?img=4'
    )
    user5 = User(
        first_name='Ivan',
        last_name='Abbett',
        email='shaffei@me.com',
        password='5CJ9CdH',
        city='Goose Creek',
        state='SC',
        zipcode='29445',
        profile_image='https://i.pravatar.cc/150?img=5'
    )
    user6 = User(
        first_name='Riley',
        last_name='Abbey',
        email='pmint@optonline.net',
        password='vhssSXC',
        city='Lancaster',
        state='NY',
        zipcode='14086',
        profile_image='https://i.pravatar.cc/150?img=6'
    )
    user7 = User(
        first_name='Gilbert',
        last_name='Abbitt',
        email='mcsporran@icloud.com',
        password='T5jv6HC',
        city='Sterling',
        state='VA',
        zipcode='20164',
        profile_image='https://i.pravatar.cc/150?img=7'
    )
    user8 = User(
        first_name='Jorge',
        last_name='Barrell',
        email='mlewan@icloud.com',
        password='QYQUJhk',
        city='Clarksburg',
        state='WV',
        zipcode='26301',
        profile_image='https://i.pravatar.cc/150?img=8'
    )
    user9 = User(
        first_name='Dan',
        last_name='Barrell',
        email='johnh@att.net',
        password='TeKvy94',
        city='Longwood',
        state='FL',
        zipcode='32779',
        profile_image='https://i.pravatar.cc/150?img=9'
    )

    db.session.add(demo)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
