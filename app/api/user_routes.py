from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Favorite_Song, Favorite_Playlist, Favorite_Album

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


"""
ADD/DELELE FAV SONG
"""
@user_routes.route('/<int:userId>/favorite_songs/<int:songId>', methods=["PUT"])
@login_required
def add_fav_songs(userId, songId):

    new_fav_song = Favorite_Song(
        userId = userId,
        songId = songId
    )
    db.session.add(new_fav_song)
    db.session.commit()

    return {'new_fav_song': new_fav_song.to_dict()}

@user_routes.route('/<int:userId>/favorite_songs/<int:songId>', methods=["DELETE"])
@login_required
def delete_fav_songs(userId, songId):

    fav_song = Favorite_Song.query.filter(Favorite_Song.userId == userId, Favorite_Song.songId == songId).first()
    db.session.delete(fav_song)
    db.session.commit()

    return {'deleted_fav_song': fav_song.to_dict()}


"""
ADD/DELELE FAV PLAYLIST
"""
@user_routes.route('/<int:userId>/favorite_playlists/<int:playlistId>', methods=["PUT"])
@login_required
def add_fav_playlists(userId, playlistId):

    new_fav_playlist = Favorite_Playlist(
        userId = userId,
        playlistId = playlistId
    )
    db.session.add(new_fav_playlist)
    db.session.commit()

    return {'new_fav_playlist': new_fav_playlist.to_dict()}

@user_routes.route('/<int:userId>/favorite_playlists/<int:playlistId>', methods=["DELETE"])
@login_required
def delete_fav_playlists(userId, playlistId):

    fav_playlist = Favorite_Playlist.query.filter(Favorite_Playlist.userId == userId, Favorite_Playlist.playlistId == playlistId).first()
    db.session.delete(fav_playlist)
    db.session.commit()

    return {'deleted_fav_plalist': fav_playlist.to_dict()}


"""
ADD/DELELE FAV ALBUM
"""
@user_routes.route('/<int:userId>/favorite_albums/<int:albumId>', methods=["PUT"])
@login_required
def add_fav_albums(userId, albumId):

    new_fav_album = Favorite_Album(
        userId = userId,
        albumId = albumId
    )
    db.session.add(new_fav_album)
    db.session.commit()

    return {'new_fav_album': new_fav_album.to_dict()}

@user_routes.route('/<int:userId>/favorite_albums/<int:albumId>', methods=["DELETE"])
@login_required
def delete_fav_albums(userId, albumId):

    fav_album = Favorite_Album.query.filter(Favorite_Album.userId == userId, Favorite_Album.albumId == albumId).first()
    db.session.delete(fav_album)
    db.session.commit()

    return {'deleted_fav_album': fav_album.to_dict()}

