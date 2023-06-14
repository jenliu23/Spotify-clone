from app.models import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():
    song1 = Song(
        userId = 4,
        title = "Moonlight Sonata (1st Movement)",
        artist = "Beethoven",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Beethoven+-+Moonlight+Sonata+(1st+Movement).mp3"
    )
    song2 = Song(
        userId = 4,
        title = "Für Elise",
        artist = "Beethoven",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Beethoven+-+Fu%CC%88r+Elise.mp3"
    )
    song3 = Song(
        userId = 4,
        title = "Pathetique Sonata (2nd Movement)",
        artist = "Beethoven",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Beethoven+-+Pathetique+Sonata+2nd+Movement.mp3"
    )
    song4 = Song(
        userId = 4,
        title = "Moonlight Sonata (2nd Movement)",
        artist = "Beethoven",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Beethoven+-+Moonlight+Sonata+(2nd+Movement).mp3"
    )
    song5 = Song(
        userId = 4,
        title = "Rage Over a Lost Penny",
        artist = "Beethoven",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Beethoven+-+Rage+Over+a+Lost+Penny.mp3"
    )
    # song1 = Song(
    #     userId = ,
    #     title = "",
    #     artist = "",
    #     songUrl = ""
    # )
    all_songs = [song1, song2, song3, song4, song5]
    print("allsongs:", all_songs)
    _ = [db.session.add(song) for song in all_songs]
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        
    db.session.commit()