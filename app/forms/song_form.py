from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, URLField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class SongForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(max=255)])
    artist = StringField("Artist", validators=[DataRequired(), Length(max=255)])
    duration = FloatField("Duration", validators=[DataRequired()])
    songUrl = FileField("SongUrl", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Submit")