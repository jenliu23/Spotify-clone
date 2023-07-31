from flask import Blueprint, jsonify, session, request, redirect, render_template
from flask_login import current_user, login_required
from app.forms import AlbumForm
from datetime import date
from random import randint
from app.models import db, Song, User, Album, Album_Song
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

album_routes = Blueprint('albums', __name__)

@album_routes.route("/")
def get_all_albums():
    all_albums = Album.query.all()
    return {'albums': [album.to_dict() for album in all_albums]}

@album_routes.route("/new", methods=["POST"])
@login_required
def upload_album():
    form = AlbumForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        coverImage = request.files["coverImage"]
        coverImage.filename = get_unique_filename(coverImage.filename)
        upload = upload_file_to_s3(coverImage)

        if "url" not in upload:
            return "url errors"
        
        new_album = Album(
            userId = current_user.id,
            title = form.data["title"],
            artist = form.data["artist"],
            releasedYear = form.data["releasedYear"],
            coverImage = upload["url"]
        )
        
        db.session.add(new_album)
        db.session.commit()
        
        return {'new_album': new_album.to_dict()}
    
    if form.errors:
        print(form.errors)

@album_routes.route("/<int:albumId>", methods=["PUT"])
@login_required
def edit_album(albumId):
    album = Album.query.get(albumId)
    form = AlbumForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        if form.data["title"]:
            album.title = form.data["title"]
        if form.data["artist"]:
            album.artist = form.data["artist"]
        if form.data["releasedYear"]:
            album.releasedYear = form.data["releasedYear"]
        
        db.session.commit()
        return {'album': album.to_dict()}
    
@album_routes.route("/<int:albumId>", methods=["DELETE"])
def delete_album(albumId):
    album = Album.query.get(albumId)
    deleted_album = {'album': album.to_dict()}
    db.session.delete(album)
    db.session.commit()
    return deleted_album

@album_routes.route("/<int:albumId>/songs/<int:songId>", methods=["PUT"])
def add_song_to_album(albumId, songId):
    new_album_song = Album_Song(
        albumId=albumId,
        songId=songId
    )
    db.session.add(new_album_song)
    db.session.commit()
    return {'new_album_song': new_album_song.to_dict()}

@album_routes.route("/<int:albumId>/songs/<int:songId>/<int:id>", methods=["DELETE"])
def delete_song_from_abum(albumId, songId, id):
    album_song = Album_Song.query.get(id)
    deleted_album_song = {'album_song': album_song.to_dict()}
    db.session.delete(album_song)
    db.session.commit()
    return deleted_album_song
