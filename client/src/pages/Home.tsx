import React, { useState } from'react';
import { Row, Col, Card, Container } from'react-bootstrap';
import Nav_bar from "../components/Nav_Bar";

interface Thread {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  genre: string;
  color: string;
  url: string;
}

const threadsData: Thread[] = [
    {
        id: 1,
        title: 'Action/Adventure Games',
        content: 'Discuss your favorite action/adventure games here!',
        createdAt: '2022-01-01',
        genre: 'Action/Adventure',
        color: '#FF9900',
        url: '/threads/1',
      },
      {
        id: 2,
        title: 'Role-Playing Games (RPGs)',
        content: 'Talk about your favorite RPGs and share your experiences!',
        createdAt: '2022-01-02',
        genre: 'RPG',
        color: '#0099CC',
        url: '/threads/2',
      },
      {
        id: 3,
        title: 'First-Person Shooter (FPS) Games',
        content: 'Discuss your favorite FPS games and strategies!',
        createdAt: '2022-01-03',
        genre: 'FPS',
        color: '#FF0000',
        url: '/threads/3',
      },
      {
        id: 4,
        title: 'Sports Games',
        content: 'Talk about your favorite sports games and teams!',
        createdAt: '2022-01-04',
        genre: 'Sports',
        color: '#00CC00',
        url: '/threads/4',
      },
      {
        id: 5,
        title: 'Strategy Games',
        content: 'Discuss your favorite strategy games and tactics!',
        createdAt: '2022-01-05',
        genre: 'Strategy',
        color: '#CCCC00',
        url: '/threads/5',
      },
      {
        id: 6,
        title: 'Simulation Games',
        content: 'Talk about your favorite simulation games and experiences!',
        createdAt: '2022-01-06',
        genre: 'Simulation',
        color: '#6600CC',
        url: '/threads/6',
      },
];

const Home: React.FC = () => {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);

  const handleThreadClick = (thread: Thread) => {
    setSelectedThread(thread);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="title">Welcome To The Old Internet</h1>
        </Col>
        <Nav_bar/>
      </Row>
      <Row>
        {threadsData.map((thread) => (
          <Col key={thread.id} xs={6} sm={4} md={3} lg={2}>
            <Card style={{ backgroundColor: thread.color, borderColor: thread.color }}>
              <Card.Body>
                <Card.Title style={{ color: 'white' }}>
                  <a href="#" onClick={() => handleThreadClick(thread)}>
                    {thread.title}
                  </a>
                </Card.Title>
                <Card.Text style={{ color: 'white' }}>{thread.content.substring(0, 100)}...</Card.Text>
                <Card.Text style={{ color: 'white' }}>Created at: {thread.createdAt}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedThread && (
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: 'white' }}>{selectedThread.title}</Card.Title>
                <Card.Text style={{ color: 'white' }}>{selectedThread.content}</Card.Text>
                <Card.Text style={{ color: 'white' }}>Created at: {selectedThread.createdAt}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;