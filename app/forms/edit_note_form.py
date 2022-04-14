from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, IntegerField
from wtforms.validators import DataRequired


class EditNoteForm(FlaskForm):
    id = IntegerField("id")
    title = StringField("title")
    content = TextAreaField("content")
    user_id = IntegerField("user_id", validators=[DataRequired()])
    # updated_at = StringField("updated_at", validators=[DataRequired()])
