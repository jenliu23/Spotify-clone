from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    playlist1 = Playlist(
        userId = 4,
        title = "Piano Collection",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistcover_piano.jpeg",
    )
    playlist2 = Playlist(
        userId = 4,
        title = "Good Day!",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistcover_smile.jpg",
    )
    playlist3 = Playlist(
        userId = 4,
        title = "Summer Vibes",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_balloon.jpg",
    )
    playlist4 = Playlist(
        userId = 5,
        title = "Spring Mix",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_spring.jpg",
    )
    playlist5 = Playlist(
        userId = 5,
        title = "Non-stop",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_workout.jpg",
    )
    playlist6 = Playlist(
        userId = 5,
        title = "My Real World",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_universe-and-planets.jpg",
    )
    playlist7 = Playlist(
        userId = 7,
        title = "Winter Songs",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistcover_winter.png",
    )
    playlist8 = Playlist(
        userId = 1,
        title = "Chill!",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistcover_chill.jpeg",
    )
    playlist9 = Playlist(
        userId = 2,
        title = "Cozy Lazy",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_sleep.jpg",
    )
    playlist10 = Playlist(
        userId = 2,
        title = "Crazy love",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_rose-smoke.jpg",
    )
    playlist11 = Playlist(
        userId = 3,
        title = "CRY A LITTLE",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_cry-a-little.jpeg",
    )
    playlist12 = Playlist(
        userId = 3,
        title = "BiBiBi",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistcover_chaos.jpeg",
    )
    playlist13 = Playlist(
        userId = 3,
        title = "It's Study Time",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_lofi-study.jpg",
    )
    playlist14 = Playlist(
        userId = 1,
        title = "Just relax",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_pink-or-blue.jpg",
    )
    playlist15 = Playlist(
        userId = 1,
        title = "Energy Booster",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_workout.jpg",
    )
    playlist16 = Playlist(
        userId = 2,
        title = ">_<",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_balloon.jpg",
    )
    playlist17 = Playlist(
        userId = 4,
        title = "TTESTTESTT",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_default.png",
    )
    playlist18 = Playlist(
        userId = 6,
        title = "Today's pick",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistcover_smile.jpg",
    )

    # playlist = Playlist(
    #     userId = ,
    #     title = "",
    #     coverImage = "",
    # )
    all_playlists = [playlist1, playlist2, playlist3, playlist4, playlist5, playlist6, playlist7, 
                     playlist8, playlist9, playlist10, playlist11, playlist12, playlist13, playlist14,
                     playlist15, playlist16, playlist17, playlist18]
    _ = [db.session.add(playlist) for playlist in all_playlists]
    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))
        
    db.session.commit()