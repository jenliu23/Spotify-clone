from app.models import db, Favorite_Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favorite_playlists():
    list1 = Favorite_Playlist(
        userId=1,
        playlistId=1,
    )
    list2 = Favorite_Playlist(
        userId=1,
        playlistId=3,
    )
    list3 = Favorite_Playlist(
        userId=2,
        playlistId=4,
    )
    list4 = Favorite_Playlist(
        userId=1,
        playlistId=5,
    )
    list5 = Favorite_Playlist(
        userId=3,
        playlistId=14,
    )

    lists = [list1, list2, list3, list4, list5]
    _ = [db.session.add(list) for list in lists]
    db.session.commit()

def undo_favorite_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorite_playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorite_playlists"))

    db.session.commit()