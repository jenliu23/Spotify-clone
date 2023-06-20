from flask import Blueprint, jsonify, session, request, redirect, render_template
from flask_login import current_user, login_required
from app.forms import PlaylistForm
from datetime import date
from random import randint
from app.models import db, Song, User, Playlist, Playlist_Song

playlist_routes = Blueprint('playlists', __name__)

@playlist_routes.route("/")
def get_all_playlists():
    all_playlists = Playlist.query.all()
    return {'playlists': [playlist.to_dict() for playlist in all_playlists]}

@playlist_routes.route("/new", methods=["POST"])
@login_required
def create_playlist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')
    if form.validate_on_submit():
        playlist = Playlist(
            userId=current_user.id,
            title=form.data["title"],
            coverImage=form.data["coverImage"]
        )
        db.session.add(playlist)
        db.session.commit()
        return {'playlist': playlist.to_dict()}
    
    if form.errors:
        print(form.errors)

@playlist_routes.route("/<int:playlistId>", methods=["PUT"])
def edit_playlist(playlistId):
    playlist = Playlist.query.get(playlistId)
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies.get('csrf_token')
    if form.validate_on_submit():
        if form.data["title"]:
            playlist.title = form.data["title"]
        if form.data["coverImage"]:
            playlist.coverImage = form.data["coverImage"]
        db.session.commit()
        return {'playlist': playlist.to_dict()}


@playlist_routes.route("/<int:playlistId>", methods=["DELETE"])
def delete_playlist(playlistId):
    playlist = Playlist.query.get(playlistId)
    deleted_playlist = {'playlist': playlist.to_dict()}
    db.session.delete(playlist)
    db.session.commit()
    return deleted_playlist


@playlist_routes.route("/<int:playlistId>/songs/<int:songId>/<int:id>", methods=["DELETE"])
def delete_song_from_playlist(playlistId, songId, id):
    playlist_song = Playlist_Song.query.get(id)
    deleted_playlist_song = {'playlist_song': playlist_song.to_dict()}
    db.session.delete(playlist_song)
    db.session.commit()
    return deleted_playlist_song
