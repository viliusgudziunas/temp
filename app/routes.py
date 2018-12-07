from flask import render_template
from app import app, db
from app.models import Entry

@app.route("/")
def index():
    entries = Entry.query.all()
    return render_template("index.html", title="Temp", entries=entries)

@app.route("/list")
def list():
    entries = Entry.query.all()
    return render_template("list.html", title="List", entries=entries)
