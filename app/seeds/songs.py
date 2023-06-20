from app.models import db, Song, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_songs():

    song1 = Song(
        userId = 4,
        title = "Moonlight Sonata (1st Movement)",
        artist = "Beethoven",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Beethoven1MoonlightSonata1stMovement.mp3"
    )
    song2 = Song(
        userId = 4,
        title = "Für Elise",
        artist = "Beethoven",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Beethoven1FurElise.mp3"
    )
    song3 = Song(
        userId = 4,
        title = "Pathetique Sonata (2nd Movement)",
        artist = "Beethoven",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Beethoven1PathetiqueSonata2nd1Movement.mp3"
    )
    song4 = Song(
        userId = 4,
        title = "Moonlight Sonata (2nd Movement)",
        artist = "Beethoven",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Beethoven1MoonlightSonata2ndMovement.mp3"
    )
    song5 = Song(
        userId = 4,
        title = "Rage Over a Lost Penny",
        artist = "Beethoven",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Beethoven1RageOveraLostPenny.mp3"
    )
    song6 = Song(
        userId = 4,
        title = "Chandelier",
        artist = "Sia",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Sia1Chandelier.mp3"
    )
    song7 = Song(
        userId = 4,
        title = "Unstoppable",
        artist = "Sia",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Sia1Unstoppable.mp3"
    )
    song8 = Song(
        userId = 5,
        title = "Welcome to My World",
        artist = "aespa",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/aespa1WelcomeToMYWorld.mp3"
    )
    song9 = Song(
        userId = 5,
        title = "Spicy",
        artist = "aespa",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/aespa1Spicy.mp3"
    )
    song10 = Song(
        userId = 5,
        title = "Salty & Sweet",
        artist = "aespa",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/aespa1SaltySweet.mp3"
    )
    song11 = Song(
        userId = 5,
        title = "Thirsty",
        artist = "aespa",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/aespa1Thirsty.mp3"
    )
    song12 = Song(
        userId = 5,
        title = "Hold On Tight",
        artist = "aespa",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/aespa1HoldOnTight.mp3"
    )
    song13 = Song(
        userId = 5,
        title = "Pink Venom",
        artist = "BLACKPINK",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/BLACKPINK1PinkVenom.mp3"
    )
    song14 = Song(
        userId = 5,
        title = "Shut Down",
        artist = "BLACKPINK",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/BLACKPINK1Shut1Down.mp3"
    )
    song15 = Song(
        userId = 5,
        title = "Typa Girl",
        artist = "BLACKPINK",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/BLACKPINK1TypaGirl.mp3"
    )
    # song1 = Song(
    #     userId = ,
    #     title = "",
    #     artist = "",
    #     songUrl = ""
    # )
    all_songs = [song1, song2, song3, song4, song5, song6, song7, song8, song9, song10, 
                 song11, song12, song13, song14, song15]
    _ = [db.session.add(song) for song in all_songs]
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        
    db.session.commit()