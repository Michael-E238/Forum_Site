from flask import Blueprint, request, jsonify
from.services.auth_service import AuthService

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    auth_service = AuthService()
    auth_service.create_user(username, password)
    return jsonify({'message': 'User created successfully'})

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    auth_service = AuthService()
    user = auth_service.authenticate(username, password)
    if user:
        return jsonify({'message': 'Login successful'})
    return jsonify({'message': 'Invalid credentials'}), 401