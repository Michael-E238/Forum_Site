import React, { useState, useEffect } from'react';
import { Container, Row, Col, Card, Form, Button } from'react-bootstrap';
import { Link } from'react-router-dom';

interface Topic {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
}

const ActionAdventurePage: React.FC = () => {
  const [topicTitle, setTopicTitle] = useState('');
  const [topicContent, setTopicContent] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  useEffect(() => {
    fetch('/action-adventure/topics')
     .then(response => response.json())
     .then(data => setTopics(data));
  }, []);

  const handleSubmitTopic = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('/action-adventure/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: topicTitle, content: topicContent })
    })
     .then(response => response.json())
     .then(data => {
        setTopics([...topics, data]);
        setTopicTitle('');
        setTopicContent('');
      });
  };

  const handleSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedTopic) {
      fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: commentContent, thread_id: selectedTopic.id })
      })
       .then(response => response.json())
       .then(data => {
          const updatedTopics = topics.map(topic => {
            if (topic.id === selectedTopic.id) {
              return {...topic, comments: [...topic.comments, data] };
            }
            return topic;
          });
          setTopics(updatedTopics);
          setCommentContent('');
        });
    }
  };

  const handleSelectTopic = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1>Action Adventure Games</h1>
          <Form onSubmit={handleSubmitTopic}>
            <Form.Group controlId="topicTitle">
              <Form.Label>Topic Title:</Form.Label>
              <Form.Control
                type="text"
                value={topicTitle}
                onChange={(event) => setTopicTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="topicContent">
              <Form.Label>Topic Content:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5} 
                value={topicContent}
                onChange={(event) => setTopicContent(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Topic
            </Button>
          </Form>
          <Link to="/">Back to Home</Link>
        </Col>
      </Row>
      <Row>
        {topics.map((topic) => (
          <Col key={topic.id} xs={12} md={6} lg={4}>
            <Card>
              <Card.Body>
                <Card.Title>{topic.title}</Card.Title>
                <Card.Text>{topic.content}</Card.Text>
                <Card.Text>Created at: {topic.createdAt}</Card.Text>
                <Button variant="primary" onClick={() => handleSelectTopic(topic)}>View Comments</Button>
                {selectedTopic && selectedTopic.id === topic.id && (
                  <div>
                    <h2>Comments:</h2>
                    {selectedTopic.comments.map((comment) => (
                      <div key={comment.id}>
                        <p>{comment.content}</p>
                        <p>Created at: {comment.createdAt}</p>
                      </div>
                    ))}
                    <Form onSubmit={handleSubmitComment}>
                      <Form.Group controlId="commentContent">
                        <Form.Label>Comment:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          value={commentContent}
                          onChange={(event) => setCommentContent(event.target.value)}
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">Submit Comment</Button>
                    </Form>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ActionAdventurePage;