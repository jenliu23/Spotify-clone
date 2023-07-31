from app.models import db, Favorite_Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favorite_songs():
    list1 = Favorite_Song(
        userId=1,
        songId=1,
    )
    list2 = Favorite_Song(
        userId=1,
        songId=11,
    )
    list3 = Favorite_Song(
        userId=2,
        songId=11,
    )
    list4 = Favorite_Song(
        userId=1,
        songId=20,
    )
    list5 = Favorite_Song(
        userId=1,
        songId=33,
    )
    list6 = Favorite_Song(
        userId=1,
        songId=40,
    )
    list7 = Favorite_Song(
        userId=1,
        songId=43,
    )

    lists = [list1, list2, list3, list4, list5, list6, list7]
    _ = [db.session.add(list) for list in lists]
    db.session.commit()

def undo_favorite_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorite_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorite_songs"))

    db.session.commit()