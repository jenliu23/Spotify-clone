from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class SongForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(max=255)])
    artist = StringField("Artist", validators=[DataRequired(), Length(max=255)])
    songUrl = FileField("SongUrl", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    # FileRequired(), 