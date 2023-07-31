from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite_Playlist(db.Model):
    __tablename__ = "favorite_playlists"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    playlistId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=False)

    user = db.relationship("User", back_populates="favorite_playlists")
    playlist = db.relationship("Playlist", back_populates="favorite_playlists")

    def to_dict(self):
        return {
            "favorite_playlists_id": self.id,
            "userId": self.userId,
            "playlistId": self.playlistId,
       }