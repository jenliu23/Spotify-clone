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
        title = "Hello",
        artist = "Adele",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Adele1Hello.mp3"
    )
    song7 = Song(
        userId = 4,
        title = "Skyfall",
        artist = "Adele",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Adele1Skyfall.mp3"
    )
    song8 = Song(
        userId = 4,
        title = "Someone Like You",
        artist = "Adele",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Adele1SomeoneLikeYou.mp3"
    )
    song9 = Song(
        userId = 4,
        title = "Chandelier",
        artist = "Sia",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Sia1Chandelier.mp3"
    )
    song10 = Song(
        userId = 4,
        title = "Unstoppable",
        artist = "Sia",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Sia1Unstoppable.mp3"
    )

    song11 = Song(
        userId = 2,
        title = "Sold Out",
        artist = "Hawk Nelson",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/HawkNelson1Sold+Out.mp3"
    )
    song12 = Song(
        userId = 2,
        title = "Believer",
        artist = "Imagine Dragons",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/ImagineDragons1Believer.mp3"
    )
    song13 = Song(
        userId = 2,
        title = "Poker Face",
        artist = "Lady Gaga",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/LadyGaga1PokerFace.mp3"
    )
    song14 = Song(
        userId = 2,
        title = "Flowers",
        artist = "Miley Cyrus",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/MileyCyrus1Flowers.mp3"
    )
    song15 = Song(
        userId = 2,
        title = "Call Me Maybe",
        artist = "Carly Rae Jepsen",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/CarlyRaeJepsen1CallMeMaybe.mp3"
    )

    song16 = Song(
        userId = 5,
        title = "Welcome to My World",
        artist = "aespa",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/aespa1WelcomeToMYWorld.mp3"
    )
    song17 = Song(
        userId = 5,
        title = "Spicy",
        artist = "aespa",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/aespa1Spicy.mp3"
    )
    song18 = Song(
        userId = 5,
        title = "Salty & Sweet",
        artist = "aespa",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/aespa1SaltySweet.mp3"
    )
    song19 = Song(
        userId = 5,
        title = "Thirsty",
        artist = "aespa",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/aespa1Thirsty.mp3"
    )
    song20 = Song(
        userId = 5,
        title = "Hold On Tight",
        artist = "aespa",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/aespa1HoldOnTight.mp3"
    )
    song21 = Song(
        userId = 5,
        title = "Pink Venom",
        artist = "BLACKPINK",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/BLACKPINK1PinkVenom.mp3"
    )
    song22 = Song(
        userId = 5,
        title = "Shut Down",
        artist = "BLACKPINK",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/BLACKPINK1Shut1Down.mp3"
    )
    song23 = Song(
        userId = 5,
        title = "Typa Girl",
        artist = "BLACKPINK",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/BLACKPINK1TypaGirl.mp3"
    )

    song24 = Song(
        userId = 3,
        title = "Almost Lover",
        artist = "A Fine Frenzy",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/AFineFrenzy1AlmostLover.mp3"
    )
    song25 = Song(
        userId = 3,
        title = "Give Us a Little Love",
        artist = "Fallulah",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/Fallulah1GiveUsALittleLove.mp3"
    )
    song26 = Song(
        userId = 3,
        title = "Sweet but Psycho",
        artist = "Ava Max",
        songUrl = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/AvaMax1SweetbutPsycho.mp3"
    )
    # song1 = Song(
    #     userId = ,
    #     title = "",
    #     artist = "",
    #     songUrl = ""
    # )
    all_songs = [song1, song2, song3, song4, song5, song6, song7, song8, song9, song10, 
                 song11, song12, song13, song14, song15, song16, song17, song18, song19,
                 song20, song21, song22, song23, song24, song25, song26]
    _ = [db.session.add(song) for song in all_songs]
    db.session.commit()


def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))
        
    db.session.commit()