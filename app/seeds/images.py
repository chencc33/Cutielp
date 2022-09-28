from random import randint
from app.models import db, Image

urls = [
    'https://i.pinimg.com/736x/b5/80/30/b58030b3f1368e44e93c9917485440c3.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-xjpE5k9uGYVnzWTAIzfS2_3R5YwAAiI4UXsLNJ7boX3_P1OJGk6UiIhONlFR6GHorY&usqp=CAU',
    'https://i.pinimg.com/236x/7a/5d/6a/7a5d6aeff4f01dd0cb641837c51bd1ba--cute-bears-puppy-love.jpg',
    'https://steamykitchen.com/wp-content/uploads/2014/12/cute-food-b.jpg',
    'https://i.pinimg.com/originals/f7/f8/67/f7f867b62fc02a07d9b4f4f77b281b4c.jpg',
    'https://pm1.narvii.com/5897/86bd96ba77edf72434961b233f6856db5c648e58_hq.jpg',
    'https://news.usc.edu/files/2020/11/Pretty-food-perception-web.jpg',
    'https://img.designswan.com/2016/06/cuteFood/2.jpg',
    'https://img.designswan.com/2016/06/cuteFood/3.jpg',
    'https://img.designswan.com/2016/06/cuteFood/11.jpg',
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

def seed_images():
    for idx in range(30):
        image = Image(
            url=urls[idx],
            user_id=randint(1,9),
            business_id=randint(1,17),
            review_id=randint(1,30)
        )
        db.session.add(image)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_images():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
