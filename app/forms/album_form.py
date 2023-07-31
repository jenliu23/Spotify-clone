from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class AlbumForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(max=20)])
    artist = StringField("Artist", validators=[DataRequired(), Length(max=50)])
    releasedYear = IntegerField("ReleasedYear", validators=[DataRequired(), NumberRange(min=0, max=2024)])
    coverImage = FileField("CoverImage", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])