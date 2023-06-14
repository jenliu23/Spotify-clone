# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime

# class Song(db.Model):
#     __tablename__ = "songs"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     title = db.Column(db.String(255), nullable=False)
#     artist = db.Column(db.String, nullable=False)
#     duration = db.Column(db.Float, nullable=False)
#     songUrl = db.Column(db.String, nullable=False)
#     createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
#     updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

#     user = db.relationship("User", back_populates="songs")