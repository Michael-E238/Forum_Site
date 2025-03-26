from flask import Blueprint, request, jsonify
from..models import Topic
from.. import db

topics = Blueprint('topics', __name__)

@topics.route('/topics', methods=['POST'])
def create_topic():
    data = request.get_json()
    topic = Topic(title=data['title'], content=data['content'])
    db.session.add(topic)
    db.session.commit()
    return jsonify({'message': 'Topic created successfully'}), 201

@topics.route('/topics', methods=['GET'])
def get_topics():
    topics = Topic.query.all()
    return jsonify([{'id': topic.id, 'title': topic.title, 'content': topic.content, 'created_at': topic.created_at} for topic in topics])