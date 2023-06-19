from app.models import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

def seed_playlists():
    playlist1 = Playlist(
        userId = 4,
        title = "Piano Collection",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_lofi-study.jpg",
    )
    playlist2 = Playlist(
        userId = 4,
        title = "Good Day!",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistcover_smile.jpg",
    )
    playlist3 = Playlist(
        userId = 5,
        title = "Summer Vibes",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_balloon.jpg",
    )
    playlist4 = Playlist(
        userId = 5,
        title = "My Real World",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_universe-and-planets.jpg",
    )
    playlist5 = Playlist(
        userId = 1,
        title = "Non-stop",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_workout.jpg",
    )
    playlist6 = Playlist(
        userId = 2,
        title = "Spring Mix",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_spring.jpg",
    )
    playlist7 = Playlist(
        userId = 3,
        title = "Just relax",
        coverImage = "https://spotify-clone-song-percent.s3.us-west-1.amazonaws.com/playlistscover/playlistscover_pink-or-blue.jpg",
    )
    # playlist = Playlist(
    #     userId = ,
    #     title = "",
    #     coverImage = "",
    # )
    all_playlists = [playlist1, playlist2, playlist3, playlist4, playlist5, playlist6, playlist7]
    _ = [db.session.add(playlist) for playlist in all_playlists]
    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))
        
    db.session.commit()