from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Playlist_Song(db.Model):
    __tablename__ = "playlist_songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    playlistId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=False)
    songId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    playlist = db.relationship("Playlist", back_populates="playlist_songs")
    song = db.relationship("Song", back_populates="playlist_songs")

    def to_dict(self):
        return {
            "playlist_songs_id": self.id,
            "playlistId": self.playlistId,
            "songId": self.songId,
            "title": self.song.to_dict()["title"],
            "artist": self.song.to_dict()["artist"],
            "songUrl": self.song.to_dict()["songUrl"],
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
       }
