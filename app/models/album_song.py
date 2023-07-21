from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Album_Song(db.Model):
    __tablename__ = "album_songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    albumId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False)
    songId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    album = db.relationship("Album", back_populates="album_songs")
    song = db.relationship("Song", back_populates="album_songs")

    def to_dict(self):
        return {
            "album_songs_id": self.id,
            "albumId": self.albumId,
            "songId": self.songId,
            "title": self.song.to_dict()["title"],
            "artist": self.song.to_dict()["artist"],
            "songUrl": self.song.to_dict()["songUrl"],
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
       }