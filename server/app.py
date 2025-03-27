from flask import Flask, request, jsonify, render_template, redirect
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from config import Config
from models.models import User, db, Category, Thread, Post

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
jwt = JWTManager(app)


# Define routes for Users
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

# Define routes for categories
@app.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([category.name for category in categories])

@app.route('/categories', methods=['POST'])
def create_category():
    category_name = request.json.get('name')
    category_description = request.json.get('description')
    category = Category(name=category_name, description=category_description)
    db.session.add(category)
    db.session.commit()
    return jsonify({'message': 'Category created successfully'})

# Define routes for threads
@app.route('/threads', methods=['GET'])
def get_threads():
    threads = Thread.query.all()
    return jsonify([thread.title for thread in threads])

@app.route('/threads', methods=['POST'])
def create_thread():
    thread_title = request.json.get('title')
    thread_content = request.json.get('content')
    category_id = request.json.get('category_id')
    thread = Thread(title=thread_title, content=thread_content, category_id=category_id)
    db.session.add(thread)
    db.session.commit()
    return jsonify({'message': 'Thread created successfully'})

# Define routes for posts
@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([post.content for post in posts])

@app.route('/posts', methods=['POST'])
def create_post():
    post_content = request.json.get('content')
    thread_id = request.json.get('thread_id')
    post = Post(content=post_content, thread_id=thread_id)
    db.session.add(post)
    db.session.commit()
    return jsonify({'message': 'Post created successfully'})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    try:
        app.run(debug=True)
    except Exception as e:
        print(f"An error occurred: {e}")