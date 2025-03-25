from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from config import Config
from models.models import User, db

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
jwt = JWTManager(app)

# Define routes for Nav bar links
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        username = request.form.get('username', None)
        password = request.form.get('password', None)
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            access_token = create_access_token(identity=username)
            return redirect(url_for('protected'))
        return jsonify({'msg': 'Bad username or password'}), 401

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    elif request.method == 'POST':
        try:
            username = request.form.get('username', None)
            password = request.form.get('password', None)
            if not username or not password:
                return jsonify({'msg': 'Username and password are required'}), 400
            user = User.query.filter_by(username=username).first()
            if user:
                return jsonify({'msg': 'Username already exists'}), 400
            new_user = User(username, password)
            db.session.add(new_user)
            db.session.commit()
            return redirect(url_for('login'))
        except Exception as e:
            print(f'An error occurred: {e}')
            return jsonify({'msg': f'An error occurred: {e}'}), 500
    
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return render_template('protected.html', logged_in_as=current_user)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    try:
        app.run(debug=True)
    except Exception as e:
        print(f"An error occurred: {e}")