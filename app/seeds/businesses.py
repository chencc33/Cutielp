from app.models import db, Business
from random import randint

names = [
'Meow Cafe',
'Award Wieners',
'Blue Collar',
'CC Kitchen',
'Conch it Up Soul Food',
'Fishing With Dynamite',
'Heritage Restaurant & Caviar Bar',
'Kinship',
'Pita Pan',
'Sears Fine Food',
'The Bear and The Monarch',
'The Marine Room',
'The Patio',
'The Smoking Goat',
'Top of the Market',
'Zuma',
'Quince'
]

phone_numbers = [
'719-558-4078',
'284-678-9032',
'229-380-0424',
'503-736-0788',
'951-490-6996',
'661-714-6577',
'710-799-0022',
'667-273-6083',
'736-284-5174',
'951-780-6014',
'958-859-2683',
'730-841-7056',
'366-743-8785',
'828-320-9853',
'731-566-9603',
'408-797-6827',
'828-570-4665'
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

urls = [
    'https://i.pinimg.com/736x/b5/80/30/b58030b3f1368e44e93c9917485440c3.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-xjpE5k9uGYVnzWTAIzfS2_3R5YwAAiI4UXsLNJ7boX3_P1OJGk6UiIhONlFR6GHorY&usqp=CAU',
    'https://i.pinimg.com/236x/7a/5d/6a/7a5d6aeff4f01dd0cb641837c51bd1ba--cute-bears-puppy-love.jpg',
    'https://steamykitchen.com/wp-content/uploads/2014/12/cute-food-b.jpg',
    'https://i.pinimg.com/originals/f7/f8/67/f7f867b62fc02a07d9b4f4f77b281b4c.jpg',
    'https://pm1.narvii.com/5897/86bd96ba77edf72434961b233f6856db5c648e58_hq.jpg',
    'https://news.usc.edu/files/2020/11/Pretty-food-perception-web.jpg',
    'https://www.travelinghoneybird.com/wp-content/uploads/2020/04/Japan-coffee-Traveling-Honeybird.jpg',
    'https://i.pinimg.com/originals/5e/5e/67/5e5e67a605282c10343702855f754244.jpg',
    'https://www.childmags.com.au/wp-content/uploads/2017/01/webkawaiifood.png',
    'https://images.squarespace-cdn.com/content/v1/59b5a647a8b2b050d1e9c97f/1584750003698-5750H7JM87T6IGOZMFHV/83336470_208053170334063_8297231784883126417_n.jpg?format=1000w',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThjxohn_HcgVVOHJNe0khkDD30mbMVEjZY2t-7Y9mn_24PWCZGQzHg4L6NMBtAjpgAq38&usqp=CAU',
    'https://i.pinimg.com/originals/02/31/5e/02315e35622e5c68875fe15cb4ac715c.png',
    'https://www.yourtango.com/sites/default/files/styles/body_image_default/public/2018/Screen%20Shot%202018-12-09%20at%208.48.49%20PM.png',
    'https://i.pinimg.com/originals/83/4d/94/834d94c2c1a7516baabda855835f7a84.jpg',
    'https://cdn.lifehack.org/wp-content/uploads/2016/04/21151239/duckstew.jpg',
    'https://img.buzzfeed.com/buzzfeed-static/static/2017-07/28/10/asset/buzzfeed-prod-fastlane-02/sub-buzz-16965-1501253588-1.png',
    'https://i.pinimg.com/550x/e0/b3/48/e0b34864a70bda8df73a155c722b7fc6.jpg',
    'https://img.myloview.com/stickers/strawberry-smoothie-look-like-a-pig-for-kids-breakfast-400-173216110.jpg',
    'https://i.pinimg.com/originals/b5/f5/8e/b5f58e8537326f7358a5bd240338b053.jpg',
    'https://steamykitchen.com/wp-content/uploads/2014/12/food-too-cute-to-eat-8.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh3I-kHDvxNjSuWnHQbDiJSghvwTiKKY73ww&usqp=CAU',
    'https://i.pinimg.com/originals/f0/8c/81/f08c8109d008bfb16b8adc79396b7d31.jpg',
    'https://i.pinimg.com/originals/01/ca/de/01cadebe3a04b7234d299835722187c7.png',
    'https://res.cloudinary.com/jnto/image/upload/w_1024,h_667,c_fill,f_auto,fl_lossy,q_auto/v1/media/filer_public/24/98/2498dd5f-8afd-45cd-a727-9134e11a0fb5/kawaii-8-1024x667_ksolhy',
    'https://1.bp.blogspot.com/-JWNud6ecp7E/X3w1wkHrSKI/AAAAAAAAUD4/UKNKz1SKh24wr_js8VE1YjSdmhzC5OXpQCLcBGAsYHQ/s2048/phonto%2B42.JPG',
    'https://i.pinimg.com/736x/a3/eb/46/a3eb461a2565767ef2c62f289c6abc57.jpg',
    'https://64.media.tumblr.com/147a8a1f87f4163240c73b4f13866b02/tumblr_pg00wkz3gf1uk7v3v_400.jpg',
    'https://m.media-amazon.com/images/I/71M7CoB9HAL._SX1000_.jpg',
    'https://lumiere-a.akamaihd.net/v1/images/recipe-winnie-the-pooh-wtp-pizza-elise-apffel-9_ab14181e.jpeg?region=0,0,1200,800',
    'https://cdn.chefclub.tools/uploads/recipes/cover-thumbnail/05b366ea-7937-4cec-bd01-38d41d7bb43a_qr4xJSi.jpg'
]

def seed_businesses():
    for idx in range(17):
        business = Business(
            owner_id = randint(1,9),
            name=names[idx],
            open=str(randint(8,11))+'am',
            close=str(randint(8,11))+'pm',
            phone=phone_numbers[idx],
            address=addresses[idx],
            city=cities[idx],
            state=states[idx],
            zipcode=zipcodes[idx],
            description=descriptions[randint(0,6)],
            price_range=randint(1,3),
            preview_image=urls[idx],
            category_id=randint(1,5)
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
