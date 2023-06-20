from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Playlist(db.Model):
    __tablename__ = "playlists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(20), nullable=False)
    coverImage = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="playlists")
    playlist_songs = db.relationship("Playlist_Song", back_populates="playlist", cascade="all, delete-orphan")

    songs_in_playlist = []
    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "title": self.title,
            "coverImage": self.coverImage,
            "username": self.user.username,
            "songs": [playlist_song.to_dict() for playlist_song in self.playlist_songs],
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
       }