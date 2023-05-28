from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name='Lition', email='demo@aa.io', password='password')
    marnie = User(
        username='SunsetSnapper', first_name='Marnothy', last_name='Glumpford IV', email='marnie@aa.io', password='password')
    bobbie = User(
        username='GalacticGawker', first_name='Robert', last_name='Szabo', email='bobbie@aa.io', password='password')
    luna = User(
        username='LunarLunatic', first_name='Luthor', last_name='Ludlowe', email='luthor@aa.io', password='password')
    clouds = User(
        username='CloudConniseur', first_name='Barnaby', last_name='Klaxton', email='barnaby@aa.io', password='password')
    padding2 = User(
        username='HubbleBubbleTrubble', first_name='Dirk', last_name='Samson', email='dirk@aa.io', password='password')
    padding3 = User(
        username='xXDragonGodXx68', first_name='Dorian', last_name='Macias', email='dorian@aa.io', password='password')
    padding4 = User(
        username='ButterBallBandit', first_name='Skylar', last_name='Biggums', email='skylar@aa.io', password='password')
    padding5 = User(
        username='SnatchMan', first_name='Ron', last_name='Bossman', email='ron@aa.io', password='password')
    padding6 = User(
        username='GlueEater1122', first_name='Gloria', last_name='Kaufmann', email='gloria@aa.io', password='password')

    allUsers = [demo, marnie, bobbie, luna, clouds, padding2,
                padding3, padding4, padding5, padding6]
    addAll = [db.session.add(user) for user in allUsers]
    db.session.commit()

    return allUsers

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
