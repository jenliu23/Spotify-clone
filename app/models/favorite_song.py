from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite_Song(db.Model):
    __tablename__ = "favorite_songs"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    songId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)

    user = db.relationship("User", back_populates="favorite_songs")
    song = db.relationship("Song", back_populates="favorite_songs")

    def to_dict(self):
        return {
            "favorite_songs_id": self.id,
            "userId": self.userId,
            "songId": self.songId,
       }