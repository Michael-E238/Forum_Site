from hmac import compare_digest
from flask import Flask
from flask import make_response
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token
from flask_jwt_extended import current_user
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "password" 
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite://"

jwt = JWTManager(app)
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    full_name = db.Column(db.Text, nullable=False)

    def check_password(self, password):
        return compare_digest(password, "password")

# Register a callback function that takes whatever object is passed in as the
# identity when creating JWTs and converts it to a JSON serializable format.
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id

# Register a callback function loading user from database when accessing a protected route. 
# Returns a python object on a successful lookup, or None if the lookup failed.
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username = username).one_or_none()
    if not user or not user.check_password(password):
        return make_response("Wrong username or password"), 401

    access_token = create_access_token(identity = user)
    return make_response(access_token = access_token)

@app.route("/who_am_i", methods=["GET"])
@jwt_required()
def protected():
    # We can now access our sqlalchemy User object via `current_user`.
    return make_response(
        id = current_user.id,
        full_name = current_user.full_name,
        username = current_user.username,
    )

if __name__ == "__main__":
    db.create_all()
    db.session.add(User(full_name = "Bruce Wayne", username = "batman"))
    db.session.add(User(full_name = "Ann Takamaki", username = "panther"))
    db.session.add(User(full_name = "Jester Lavore", username = "little_sapphire"))
    db.session.commit()

    app.run()