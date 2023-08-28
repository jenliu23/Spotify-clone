from app.models import db, Album_Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_album_songs():
    list1 = Album_Song(
        albumId=1,
        songId=1,
    )
    list2 = Album_Song(
        albumId=1,
        songId=2,
    )
    list3 = Album_Song(
        albumId=1,
        songId=3,
    )
    list4 = Album_Song(
        albumId=1,
        songId=4,
    )
    list5 = Album_Song(
        albumId=1,
        songId=5,
    )

    list6 = Album_Song(
        albumId=2,
        songId=6,
    )
    list7 = Album_Song(
        albumId=2,
        songId=7,
    )
    list8 = Album_Song(
        albumId=2,
        songId=8,
    )
    list9 = Album_Song(
        albumId=2,
        songId=9,
    )
    list10 = Album_Song(
        albumId=2,
        songId=10,
    )

    list11 = Album_Song(
        albumId=3,
        songId=11,
    )
    list12 = Album_Song(
        albumId=3,
        songId=12,
    )
    list13 = Album_Song(
        albumId=3,
        songId=13,
    )

    list14 = Album_Song(
        albumId=4,
        songId=14,
    )
    list15 = Album_Song(
        albumId=4,
        songId=15,
    )

    list16 = Album_Song(
        albumId=5,
        songId=16,
    )
    list17 = Album_Song(
        albumId=5,
        songId=17,
    )
    list18 = Album_Song(
        albumId=5,
        songId=18,
    )
    list19 = Album_Song(
        albumId=5,
        songId=19,
    )
    list20 = Album_Song(
        albumId=5,
        songId=20,
    )
    list21 = Album_Song(
        albumId=5,
        songId=21,
    )

    list22 = Album_Song(
        albumId=6,
        songId=24,
    )
    list23 = Album_Song(
        albumId=6,
        songId=25,
    )
    list24 = Album_Song(
        albumId=6,
        songId=26,
    )

    list25 = Album_Song(
        albumId=7,
        songId=34,
    )

    list26 = Album_Song(
        albumId=8,
        songId=36,
    )

    list27 = Album_Song(
        albumId=8,
        songId=37,
    )
    list28 = Album_Song(
        albumId=9,
        songId=38,
    )

    list29 = Album_Song(
        albumId=10,
        songId=39,
    )

    list30 = Album_Song(
        albumId=11,
        songId=40,
    )
    list31 = Album_Song(
        albumId=11,
        songId=41,
    )
    list32 = Album_Song(
        albumId=11,
        songId=42,
    )

    list33 = Album_Song(
        albumId=12,
        songId=43,
    )
    list34 = Album_Song(
        albumId=7,
        songId=44,
    )
    list35 = Album_Song(
        albumId=7,
        songId=45,
    )

    lists = [list1, list2, list3, list4, list5, list6, list7, list8, list9, list10, list11, list12, list13, list14, list15,
             list16, list17, list18, list19, list20, list21, list22, list23, list24, list25, list26, list27, list28, list29,
             list30, list31, list32, list33, list34, list35]
    _ = [db.session.add(list) for list in lists]
    db.session.commit()

def undo_album_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.album_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM album_songs"))

    db.session.commit()