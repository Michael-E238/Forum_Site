import React, { useState } from'react';
import { Container, Row, Col, Card, Form, Button } from'react-bootstrap';

interface Topic {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const ActionAdventurePage: React.FC = () => {
  const [topicTitle, setTopicTitle] = useState('');
  const [topicContent, setTopicContent] = useState('');
  const [topics, setTopics] = useState<Topic[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTopic: Topic = {
      id: topics.length + 1,
      title: topicTitle,
      content: topicContent,
      createdAt: new Date().toISOString(),
    };
    setTopics([...topics, newTopic]);
    setTopicTitle('');
    setTopicContent('');
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1>Action Adventure Games</h1>
          <Form onSubmit={handleSubmit}>
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ActionAdventurePage;