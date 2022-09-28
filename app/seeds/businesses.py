from app.models import db, Business
from random import randint

names = [
'Meow Cafe',
'Award Wieners',
'Blue Collar',
'Pizza Kitchen',
'Conch it Up Soul Food',
'Fishing With Dynamite',
'Heritage Restaurant & Caviar Bar',
'Kinship',
'Pita Pan',
'Sears Fine Food',
'The Bear & The Monarch',
'The Marine Room',
'The Patio',
'The Smoking Goat',
'Top of the Market',
'Zuma',
'Quince'
]

phone_numbers = [
'(719) 558-4078',
'(284) 678-9032',
'(229) 380-0424',
'(503) 736-0788',
'(951) 490-6996',
'(661) 714-6577',
'(710) 799-0022',
'(667) 273-6083',
'(736) 284-5174',
'(951) 780-6014',
'(958) 859-2683',
'(730) 841-7056',
'(366) 743-8785',
'(828) 320-9853',
'(731) 566-9603',
'(408) 797-6827',
'(828) 570-4665'
]

addresses = [
'9524 Crescent St.',
'8200 Aspen Lane',
'8291 Rockwell St.',
'981 W. Carson Street',
'600 Creekside Lane',
'8653 Amerige Ave.',
'21 Hillcrest Street',
'8923 Bedford Ave.',
'7719 Locust Street',
'961 S. Clinton Dr.',
'884 East Dr.',
'8060 Myers St.',
'31 Longbranch Road',
'63 Lantern Dr.',
'2 Birch Hill Street',
'7912 Lancaster St.',
'8060 Myers St.'
]

cities =[
'Newport News',
'Calumet City',
'Los Angeles',
'Augusta',
'Pottstown',
'Palm Coast',
'West Hempstead',
'Melrose',
'Clarksburg',
'Kalamazoo',
'Murrells Inlet',
'Melrose',
'Charleston',
'Clarksburg',
'Depew',
'Kalamazoo',
'Wakefield'
]

states =[
'VA',
'IL',
'CA',
'GA',
'PA',
'FL',
'NY',
'MA',
'WV',
'MI',
'SC',
'MA',
'SC',
'WV',
'NY',
'MI',
'MA'
]

zipcodes = [
'23601',
'60409',
'90008',
'30906',
'19464',
'32137',
'11552',
'21760',
'26301',
'49009',
'29576',
'21760',
'29406',
'26301',
'14043',
'49009',
'21880'
]

descriptions = [
"Sometimes there's no better way to start the day than with a fresh cup of coffee and a handcrafted treat, and that's just what we aim to offer the Bay Area. We hope to welcome you soon!",
"Offering traditional Neapolitan pizza pies on the original downtown Burlingame; Grand Opening soon!",
"We serve authentic, healthy, tasty seafood and verities dishes. Watch while plates after plates of fresh seafood, veggies are cooked right in front of your eyes!",
"We have a variety of fresh and live seafood coming daily. We also have prepared food to go such as Ceviche, Sashimi, Hawaiian style poke, Sushi, Salmon burger, Fish and Chips, fresh Oyster, Clam chouder, Fish Taco.",
"We take pride to offer our guests hand-made pita, hot and fresh from our stone hearth oven. We have an array of delicious Middle Eastern vegetable salads, made daily from local, mostly organic products. Our guest's are able to customize their meals with our pickle bar selection and our special house-made hot sauces.",
"We been a favorite amongst tourists and locals alike for over 75 years. We offer an extensive menu of breakfast, lunch and dinner favorites to satisfy any craving, so stop by any time for a great meal.",
"Specializing in organic wood-fired cuisine, we serve simple food created with seasonal ingredients sourced from local purveyors."
]

def seed_businesses():
    for idx in range(18):
        business = Business(
            owner_id = randint(1,10),
            name=names[idx],
            email=f'{names[idx].replace(" ", "")}@gmail.com',
            website=f'www.{names[idx].replace(" ", "")}.com',
            open=f'{randint(8,11)}am',
            close=f'{randint(8,11)}pm',
            phone=phone_numbers[idx],
            address=addresses[idx],
            city=cities[idx],
            state=states[idx],
            zipcode=zipcodes[idx],
            description=descriptions[randint(1,6)],
            price_range=f'{randint(1,3)}'
        )
        db.session.add(business)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_businesses():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
