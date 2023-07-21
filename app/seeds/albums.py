from app.models import db, Album, environment, SCHEMA
from sqlalchemy.sql import text

def seed_albums():
    album1 = Album(
        userId = 4,
        title = "Beethoven Collection",
        artist = "Beethoven",
        releasedYear = 2021,
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/albumscover/Beethoven.jpeg",
    )
    album2 = Album(
        userId = 4,
        title = "Adele Collection",
        artist = "Adele",
        releasedYear = 2015,
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/albumscover/Adele.jpg",
    )
    album3 = Album(
        userId = 4,
        title = "This Is Acting",
        artist = "Sia",
        releasedYear = 2016,
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/albumscover/SiaThisisacting.png",
    )
    album4 = Album(
        userId = 2,
        title = "The Fame Monster",
        artist = "Lady Gaga",
        releasedYear = 2009,
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/albumscover/LadyGagaTheFameMonster.png",
    )
    album5 = Album(
        userId = 5,
        title = "My World",
        artist = "aespa",
        releasedYear = 2023,
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/albumscover/aespaMyWorld.jpg",
    )
    album6 = Album(
        userId = 5,
        title = "Born Pink",
        artist = "BLACKPINK",
        releasedYear = 2022,
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/albumscover/BLACKPINKBornPink.webp",
    )
    album7 = Album(
        userId = 3,
        title = "GRL GVNG",
        artist = "XG",
        releasedYear = 2023,
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/albumscover/XG.png",
    )

    # album = Album(
    #     userId = ,
    #     title = "",
    #     coverImage = "",
    # )
    all_albums = [album1, album2, album3, album4, album5, album6, album7]
    _ = [db.session.add(album) for album in all_albums]
    db.session.commit()

def undo_albums():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.albums RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM albums"))
        
    db.session.commit()