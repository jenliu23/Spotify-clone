from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    songs = db.relationship("Song", back_populates="user")
    playlists = db.relationship("Playlist", back_populates="user")
    albums = db.relationship("Album", back_populates="user")

    favorite_songs = db.relationship("Favorite_Song", back_populates="user", cascade="all, delete-orphan")
    favorite_playlists = db.relationship("Favorite_Playlist", back_populates="user", cascade="all, delete-orphan")
    favorite_albums = db.relationship("Favorite_Album", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'uploaded_songs': [song.to_dict() for song in self.songs],
            'favorite_songs': [favorite_song.to_dict()["songId"] for favorite_song in self.favorite_songs],
            'favorite_playlists': [favorite_playlist.to_dict()["playlistId"] for favorite_playlist in self.favorite_playlists],
            'favorite_albums': [favorite_album.to_dict()["albumId"] for favorite_album in self.favorite_albums]
            # 'created_playlists': [playlist.to_dict() for playlist in self.playlists]
        }
