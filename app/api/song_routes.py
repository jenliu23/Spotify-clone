# from flask import Blueprint, jsonify, session, request, redirect, render_template
# from app.forms import SongForm
# from datetime import date
# from random import randint
# from ..models import db, Song, User
# from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

# songs = Blueprint('songs', __name__)

# # @songs.route("/all")
# # def get_all_songs():
# #     all_songs = Song.query.order_by(Song.post_date.desc().all())
# #     print(all_songs)
# #     return 

# @songs.route("/new", methods=["GET", "POST"])
# def create_song():
#     form = SongForm()

#     if form.validate_on_submit():


#         songImage = form.data["songImage"]
#         songImage.filename = get_unique_filename(songImage.filename)
#         upload = upload_file_to_s3(songImage)

#         if "url" not in upload:
#             return 