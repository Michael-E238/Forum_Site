import React from'react';
import { Container, Row, Col, Card } from'react-bootstrap';
import { Link } from'react-router-dom';

interface Thread {
  id: number;
  title: string;
  content: string;
  genre: string;
  color: string;
  url: string;
}

const threadsData: Thread[] = [
  {
    id: 1,
    title: 'Action/Adventure Games',
    content: 'Discuss your favorite action/adventure games here!',
    genre: 'Action/Adventure',
    color: '#FF9900',
    url: '/action-adventure',
  },
  {
    id: 2,
    title: 'Role-Playing Games (RPGs)',
    content: 'Talk about your favorite RPGs and share your experiences!',
    genre: 'RPG',
    color: '#0099CC',
    url: '/threads/2',
  },
  {
    id: 3,
    title: 'First-Person Shooter (FPS) Games',
    content: 'Discuss your favorite FPS games and strategies!',
    genre: 'FPS',
    color: '#FF0000',
    url: '/threads/3',
  },
  {
    id: 4,
    title: 'Sports Games',
    content: 'Talk about your favorite sports games and teams!',
    genre: 'Sports',
    color: '#00CC00',
    url: '/threads/4',
  },
  {
    id: 5,
    title: 'Strategy Games',
    content: 'Discuss your favorite strategy games and tactics!',
    genre: 'Strategy',
    color: '#CCCC00',
    url: '/threads/5',
  },
  {
    id: 6,
    title: 'Simulation Games',
    content: 'Talk about your favorite simulation games and experiences!',
    genre: 'Simulation',
    color: '#6600CC',
    url: '/threads/6',
  },
];

function Home() {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="title">Welcome To The Old Internet</h1>
        </Col>
      </Row>
      <Row>
        {threadsData.map((thread) => (
          <Col key={thread.id} xs={6} sm={4} md={3} lg={2}>
            <Card style={{ backgroundColor: thread.color, borderColor: thread.color }}>
              <Card.Body>
                <Card.Title style={{ color: 'white' }}>
                  <Link to={thread.url}>
                    {thread.title}
                  </Link>
                </Card.Title>
                <Card.Text style={{ color: 'white' }}>{thread.content.substring(0, 100)}...</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;