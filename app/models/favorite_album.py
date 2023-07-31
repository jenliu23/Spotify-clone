from .db import db, environment, SCHEMA, add_prefix_for_prod

class Favorite_Album(db.Model):
    __tablename__ = "favorite_albums"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    albumId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('albums.id')), nullable=False)

    user = db.relationship("User", back_populates="favorite_albums")
    album = db.relationship("Album", back_populates="favorite_albums")

    def to_dict(self):
        return {
            "favorite_albums_id": self.id,
            "userId": self.userId,
            "albumId": self.albumId,
       }