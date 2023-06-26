from app.models import db, Playlist_Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlist_songs():
    list1 = Playlist_Song(
        playlistId=1,
        songId=1,
    )
    list2 = Playlist_Song(
        playlistId=1,
        songId=2,
    )
    list3 = Playlist_Song(
        playlistId=1,
        songId=3,
    )
    list4 = Playlist_Song(
        playlistId=1,
        songId=4,
    )
    list5 = Playlist_Song(
        playlistId=1,
        songId=5,
    )

    list6 = Playlist_Song(
        playlistId=2,
        songId=12,
    )
    list7 = Playlist_Song(
        playlistId=2,
        songId=13,
    )
    list8 = Playlist_Song(
        playlistId=2,
        songId=14,
    )

    list9 = Playlist_Song(
        playlistId=3,
        songId=14,
    )
    list10 = Playlist_Song(
        playlistId=3,
        songId=26,
    )
    list11 = Playlist_Song(
        playlistId=3,
        songId=10,
    )
    list12 = Playlist_Song(
        playlistId=3,
        songId=11,
    )

    list13 = Playlist_Song(
        playlistId=4,
        songId=24,
    )
    list14 = Playlist_Song(
        playlistId=4,
        songId=25,
    )
    list15 = Playlist_Song(
        playlistId=4,
        songId=15,
    )

    lists = [list1, list2, list3, list4, list5, list6, list7, list8, list9, list10, list11, list12, list13, list14, list15]
    _ = [db.session.add(list) for list in lists]
    db.session.commit()

def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()