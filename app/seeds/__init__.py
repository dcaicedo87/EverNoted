from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notebooks import seed_notebooks, undo_notebooks
from .notes import seed_notes, undo_notes
from .tags import seed_tags, undo_tags
from .tag_notes_join import seed_tag_notes_join, undo_tag_notes_join

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_notebooks()
    seed_notes()
    seed_tags()
    seed_tag_notes_join()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_notebooks()
    undo_notes()
    undo_tags()
    undo_tag_notes_join()
    # Add other undo functions here
