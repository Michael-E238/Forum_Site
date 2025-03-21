from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from models import User

auth_blueprint = Blueprint('auth', __name__)
jwt = JWTManager()

def create_token(user):
    access_token = create_access_token(identity=user.username)
    return access_token

@auth_blueprint.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_token(user)
        return jsonify(access_token=access_token)
    return jsonify({'msg': 'Bad username or password'}), 401

@auth_blueprint.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user)