from models import User
from flask import current_app
from werkzeug.security import generate_password_hash, check_password_hash

class AuthService:
    def __init__(self):
        self.db = current_app.config['db']

    def create_user(self, username, password):
        user = User(username=username, password=generate_password_hash(password))
        self.db.session.add(user)
        self.db.session.commit()

    def authenticate(self, username, password):
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            return user
        return None