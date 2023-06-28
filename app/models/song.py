from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Song(db.Model):
    __tablename__ = "songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(50), nullable=False)
    artist = db.Column(db.String(50), nullable=False)
    songUrl = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="songs")
    playlist_songs = db.relationship("Playlist_Song", back_populates="song", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "songId": self.id,
            "userId": self.userId,
            "title": self.title,
            "artist": self.artist,
            "songUrl": self.songUrl,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
       }