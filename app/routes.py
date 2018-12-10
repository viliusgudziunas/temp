from flask import render_template
from app import app, db
from app.models import Entry

@app.route("/")
def index():
    entries = Entry.query.all()
    return render_template("index.html", title="Temp", entries=entries)

@app.route("/popup")
def popup():
    return render_template("popup.html", title="Popup")
