from app.models import db, Favorite_Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favorite_albums():
    list1 = Favorite_Album(
        userId=1,
        albumId=1,
    )
    list2 = Favorite_Album(
        userId=1,
        albumId=5,
    )
    list3 = Favorite_Album(
        userId=2,
        albumId=4,
    )

    lists = [list1, list2, list3]
    _ = [db.session.add(list) for list in lists]
    db.session.commit()

def undo_favorite_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorite_albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorite_albums"))

    db.session.commit()