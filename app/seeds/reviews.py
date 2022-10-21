from random import randint
from app.models import db, Review
from sqlalchemy import exc

reviews = [
    "OMG! So good! This was one of the best mouth-watering steaks I've had grace my taste buds in a long time. The waiter was prompt and polite. The decor was unique and incredible. I'd give more than 5 stars if I could!",
    "My taste buds are still singing from our last visit! The desserts must be sprinkled with crack because I just craved for more and more. This was one of the best mouth-watering burgers I've had grace my taste buds in a long time. They got a new customer for life!",
    "I've got a fetish for good food and this place gets me hot! This was one of the best mouth-watering steaks I've had grace my taste buds in a long time. After my meal, I was knocked into a food coma. Overall experience: 5 stars.",
    "Yumm-o! Make sure to save room for dessert, because that was the best part of the meal! Everything I tried was bursting with flavor. I'm definitely coming back for more!",
    "This is one of my favorite places. Everything was just so yummy. The waiter was prompt and polite. After my meal, I was knocked into a food coma. The entrees are simply to die for. I'd give more than 5 stars if I could!",
    "Yummers! This was one of the best mouth-watering steaks I've had grace my taste buds in a long time. The waitress did an excellent job. I'm definitely coming back for more!",
    "My taste buds are still dancing from our last visit! Everything was simply decadent. Make sure to save room for dessert, because that was the best part of the meal! The waiter was prompt and polite. I want to hire their decorator to furnish my apartment. Overall experience: 5 stars.",
    "Best experience ever! The food was cooked to perfection. The waiter was prompt and polite. I want to hire their decorator to furnish my house. 5 stars!",
    "My taste buds are still tingling from our last visit! Everything I tried was bursting with flavor. The decor was unique and incredible. The waiter was prompt and polite. The food was flavorful, savory, and succulent. They got a new customer for life!",
    "I've got a fetish for good food and this place gets me hot! I want to hire their decorator to furnish my house. The desserts must be sprinkled with crack because I just craved for more and more. I was happy to see how clean everything was. The waiter did an excellent job. I'd give more than 5 stars if I could!",
    "OMG! So good! Make sure to save room for dessert, because that was the best part of the meal! Try out the huge selection of incredible appetizers. I was happy to see how clean everything was. The decor was unique and incredible. 5 stars!",
    "Best experience ever! I was happy to see how clean everything was. After my meal, I was knocked into a food coma. I found the ambiance to be very charming. Everything was simply decadent. 5 stars!",
    "It was much better than I expected. The waitress was prompt and polite. The food was cooked to perfection. Try out the huge selection of incredible appetizers. 5 stars!",
    "I stumbled on this undiscovered gem right in our neighboorhood. Try out the huge selection of incredible appetizers. I want to hire their decorator to furnish my apartment. Everything was simply decadent. Easily earned their 5 stars!",
    "I stumbled on this undiscovered gem right in our neighboorhood. Everything I tried was bursting with flavor. After my meal, I was knocked into a food coma. I would eat here every day if I could afford it!",
    "I've got a fetish for good food and this place gets me hot! Make sure to save room for dessert, because that was the best part of the meal! The food was cooked to perfection. The decor was unique and incredible. The waitress did an excellent job. This is definitely a spot I'll be frequenting.",
    "Yummers! The decor was unique and incredible. Try out the huge selection of incredible appetizers. The experience was heavenly as I was served a meal fit for God himself. I'm definitely coming back for more!",
    "Yummers! The waitress did an excellent job. Everything was simply decadent. I want to hire their decorator to furnish my house. I'm definitely coming back for more!",
    "I was pleasantly surprised. The food was flavorful, savory, and succulent. The waiter was prompt and polite. Try out the huge selection of incredible appetizers. There were a lot of interesting decorations on the walls. I would have rated this higher, but my wine glass was dirty.",
    "It was much better than I expected. The steak was a little dry. I want to hire their decorator to furnish my apartment. I docked them one star because the busboy had really bad body odor.",
    "I have been here several times before. The waitress did an excellent job. The chicken was a little dry. Everything I tried was bursting with flavor. There were a lot of interesting decorations on the walls. It could have been perfect, but my water glass was dirty.",
    "This place had a lot of heart. I was happy to see how clean everything was. The food was cooked to perfection. I found the ambiance to be very charming. Try out the huge selection of incredible appetizers. Overall experience: 4 stars.",
    "This place was nearby and I decided to check it out. Make sure to save room for dessert, because that was the best part of the meal! I want to hire their decorator to furnish my apartment. I was happy to see how clean everything was. 4 stars.",
    "I had high hopes for this place. The photos of the food were appetizing and palpable, but didn't live up to the hype. The service was good for the most part but the waiter was a bit clueless. Overhyped. Overall, this place is just ok. I could come back.",
    "I'm torn about this place. I found the entrees to be somewhat agreeable to my personal flavor-profile. There were a lot of interesting decorations on the walls. I was not very pleased to find out that the coffee wasn't local. The menu didn't match the one on their website. This place deserves its very average rating.",
    "This place was just ok. The steak was under-seasoned. The ambiance gives off an earthy feel-good vibe. I was not very pleased to find out that the coffee wasn't local. The service was good for the most part but the waitress was a bit rude. 3 stars.",
    "I'm torn about this place. Overhyped. The steak was a little dry. I had a satisfactory experience and will have to try it again.",
    "I have been here several times before. The menu didn't match the one on their website. The food was all right but seriously lacked presentation. I was not very pleased to find out that the coffee wasn't local. Overall experience: 3 stars.",
    "I'm torn about this place. I felt the prices were too high given the quality of the food. I found the entrees to be somewhat agreeable to my personal flavor-profile. The ambiance gives off an earthy feel-good vibe. I was not very pleased to find out that the coffee wasn't organic. 3 stars.",
    "I don't understand the hype about this place. The entree I had was sublime. Overhyped. I was not very pleased to find out that the coffee wasn't fair trade. The menu didn't match the one on their website. I would probably come back more often if the service was better."
]

def seed_reviews():
    for idx in range(30):
        review = Review(
            review=reviews[idx],
            stars=randint(3,5),
            user_id=randint(1,9),
            business_id=randint(1,17)
        )
        db.session.add(review)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
    db.session.commit()
