from flask import Blueprint, jsonify, session, request, redirect, render_template
from flask_login import current_user, login_required
from app.forms import SongForm
from datetime import date
from random import randint
from app.models import db, Song, User
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

song_routes = Blueprint('songs', __name__)

# @songs.route("/all")
# def get_all_songs():
#     all_songs = Song.query.order_by(Song.post_date.desc().all())
#     print(all_songs)
#     return 

@song_routes.route("/")
def get_all_songs():
    all_songs = Song.query.all()
    return {'songs': [song.to_dict() for song in all_songs]}


@song_routes.route("/<int:songId>")
def get_song(songId):
    song = Song.query.get(songId)
    return {'song': song.to_dict()}


@song_routes.route("/new", methods=["POST"])
@login_required
def upload_song():
    form = SongForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        songUrl = request.files["songUrl"]
        songUrl.filename = get_unique_filename(songUrl.filename)
        upload = upload_file_to_s3(songUrl)

        if "url" not in upload:
            return "url errors"
        
        new_song = Song(
            userId = current_user.id,
            title = form.data["title"],
            artist = form.data["artist"],
            songUrl = upload["url"]
        )
        
        db.session.add(new_song)
        db.session.commit()
        
        return {'new_song': new_song.to_dict()}
    
    if form.errors:
        print(form.errors)


@song_routes.route("/<int:songId>", methods=["PUT"])
@login_required
def edit_song(songId):
    song = Song.query.get(songId)
    form = SongForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        if form.data["title"]:
            song.title = form.data["title"]
        if form.data["artist"]:
            song.artist = form.data["artist"]
        
        db.session.commit()
        return {'song': song.to_dict()}
    else:
        print(form.errors)


@song_routes.route("/<int:songId>", methods=["DELETE"])
def delete_song(songId):
    song = Song.query.get(songId)
    song_delete = remove_file_from_s3(song.songUrl)

    if song_delete:
        db.session.delete(song)
        db.session.commit()
        return {'song_delete': song.to_dict()}
    else:
        return "<h1>File delete error!</h1>"