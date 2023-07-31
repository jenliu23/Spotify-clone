from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Album(db.Model):
    __tablename__ = "albums"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(20), nullable=False)
    artist = db.Column(db.String(50), nullable=False)
    releasedYear = db.Column(db.Integer, nullable=False)
    coverImage = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="albums")
    album_songs = db.relationship("Album_Song", back_populates="album", cascade="all, delete-orphan")

    favorite_albums = db.relationship("Favorite_Album", back_populates="album", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "title": self.title,
            "artist": self.artist,
            "releasedYear": self.releasedYear,
            "coverImage": self.coverImage,
            "username": self.user.username,
            "songs": [album_song.to_dict() for album_song in self.album_songs],
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
       }