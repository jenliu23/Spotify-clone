from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class PlaylistForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(max=20)])
    coverImage = StringField("CoverImage", validators=[DataRequired()])