from datetime import datetime
from werkzeug.security import generate_password_hash

from database import db

class User(db.Document):
    username = db.StringField(required=True)
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True)
    full_name = db.StringField()
    date_of_birth = db.DateTimeField()
    country = db.StringField()
    created_at = db.DateTimeField(default=datetime.utcnow)
    updated_at = db.DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'user'
    }

    def set_password(self, password):
        self.password = generate_password_hash(password)
