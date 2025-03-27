from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] ='sqlite:///database.db'
app.config['JWT_SECRET_KEY'] ='super-secret'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600  # 1 hour
db = SQLAlchemy(app)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

class Topic(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.current_timestamp())

# functional Thread and comment models
class Thread(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', backref=db.backref('threads', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'user_id': self.user_id
        }

    def to_dict(self):
        return {
            'id': getattr(self, 'id', None),
            'title': getattr(self, 'title', None),
            'content': getattr(self, 'content', None),
            'user_id': getattr(self, 'user_id', None)
        }
    
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    thread_id = db.Column(db.Integer, db.ForeignKey('thread.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    thread = db.relationship('Thread', backref=db.backref('comments', lazy=True))
    user = db.relationship('User', backref=db.backref('comments', lazy=True))

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'thread_id': self.thread_id,
            'user_id': self.user_id
        }

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

# method for users to create and login to accounts    

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'User created successfully'})

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    user = User.query.filter_by(username=username).first()
    if user:
        if check_password_hash(user.password, password):
            access_token = create_access_token(identity=username)
            return jsonify({'access_token': access_token})
        else:
            return jsonify({'msg': 'Bad password'}), 401
    else:
        return jsonify({'msg': 'Bad username'}), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'msg': f'Hello, {current_user}!'})

# routes for topics and threads

@app.route('/topics', methods=['GET', 'POST'])
@jwt_required()
def topics():
    if request.method == 'GET':
        topics = Topic.query.all()
        return jsonify([{'id': topic.id, 'title': topic.title, 'content': topic.content, 'created_at': topic.created_at} for topic in topics])
    elif request.method == 'POST':
        topic = Topic(title=request.json['title'], content=request.json['content'])
        db.session.add(topic)
        db.session.commit()
        return jsonify({'id': topic.id, 'title': topic.title, 'content': topic.content, 'created_at': topic.created_at})


@app.route('/threads', methods=['GET', 'POST'])
@jwt_required()
def threads():
    if request.method == 'POST':
        if 'title' in request.json and 'content' in request.json and 'user_id' in request.json:
            thread = Thread(title=request.json['title'], content=request.json['content'], user_id=request.json['user_id'])
            db.session.add(thread)
            db.session.commit()
            return jsonify({'id': thread.id, 'title': thread.title, 'content': thread.content, 'user_id': thread.user_id})
        else:
            return jsonify({'error': 'Missing required fields'}), 400

# Routes for comments

@app.route('/threads/<int:thread_id>/comments', methods=['POST'])
@jwt_required()
def create_comment(thread_id):
    thread = Thread.query.get(thread_id)
    if thread is None:
        return jsonify({'msg': 'Thread not found'}), 404
    content = request.json.get('content')
    if content is None:
        return jsonify({'msg': 'Content is required'}), 400
    user = User.query.filter_by(username=get_jwt_identity()).first()
    if user is None:
        return jsonify({'msg': 'User not found'}), 404
    comment = Comment(content=content, thread_id=thread_id, user_id=user.id)
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict())

@app.route('/threads/<int:thread_id>/comments', methods=['GET'])
def get_comments(thread_id):
    thread = Thread.query.get(thread_id)
    if thread is None:
        return jsonify({'msg': 'Thread not found'}), 404
    comments = Comment.query.filter_by(thread_id=thread_id).all()
    return jsonify([comment.to_dict() for comment in comments])

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
    app.run(debug=True)