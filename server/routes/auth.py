from flask import Blueprint, request, make_response
from flask_jwt_extended import create_access_token, jwt_required, current_user
from models import User, db

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(username=username).one_or_none()
    if not user or not user.check_password(password):
        return make_response("Wrong username or password"), 401

    access_token = create_access_token(identity=user)
    return make_response(access_token=access_token)

@auth_blueprint.route("/who_am_i", methods=["GET"])
@jwt_required()
def protected():
    return make_response(
        id=current_user.id,
        full_name=current_user.full_name,
        username=current_user.username,
    )