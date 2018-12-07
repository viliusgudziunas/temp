from app import db

class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), unique=True)
    body = db.Column(db.String(256))

    def __repr__(self):
        return "<Entry> {}\n{}".format(self.title, self.body)
