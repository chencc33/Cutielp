from flask.cli import AppGroup
from .users import seed_users, undo_users
from .businesses import seed_businesses, undo_businesses
from .images import seed_images, undo_images
from .reviews import seed_reviews, undo_reviews
from .categories import seed_category, undo_category

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_category()
    seed_businesses()
    seed_reviews()
    seed_images()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_category()
    undo_businesses()
    undo_reviews()
    undo_images()
