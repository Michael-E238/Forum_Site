import React, { useState } from'react';
import { Row, Col, Card, Container } from'react-bootstrap';
import myImage from "./assets/Pixel Pit.png";

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
        color: '#1b263b',
        url: '/threads/1',
      },
      {
        id: 2,
        title: 'Role-Playing Games (RPGs)',
        content: 'Talk about your favorite RPGs and share your experiences!',
        createdAt: '2022-01-02',
        genre: 'RPG',
        color: '#1b263b',
        url: '/threads/2',
      },
      {
        id: 3,
        title: 'First-Person Shooter (FPS) Games',
        content: 'Discuss your favorite FPS games and strategies!',
        createdAt: '2022-01-03',
        genre: 'FPS',
        color: '#1b263b',
        url: '/threads/3',
      },
      {
        id: 4,
        title: 'Sports Games',
        content: 'Talk about your favorite sports games and teams!',
        createdAt: '2022-01-04',
        genre: 'Sports',
        color: '#1b263b',
        url: '/threads/4',
      },
      {
        id: 5,
        title: 'Strategy Games',
        content: 'Discuss your favorite strategy games and tactics!',
        createdAt: '2022-01-05',
        genre: 'Strategy',
        color: '#1b263b',
        url: '/threads/5',
      },
      {
        id: 6,
        title: 'Simulation Games',
        content: 'Talk about your favorite simulation games and experiences!',
        createdAt: '2022-01-06',
        genre: 'Simulation',
        color: '#1b263b',
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
       <div style={{ backgroundImage: `url(${myImage})`, backgroundSize: 'cover' }}>
  {/* Content here */}
</div>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>

        <Card>
            <Card.Title style={{ color: 'white' }}>
          <h1 className="title">Welcome To Pixel Pit</h1>
          </Card.Title>
          <Card.Title style={{ color: 'Bone' }}>
          <h2 className="title">The Internet Before Y2K</h2>
          </Card.Title>
          </Card>
        </Col>
      </Row>
      <Row>
        {threadsData.map((thread) => (
          <Col key={thread.id} xs={6} sm={4} md={3} lg={2}>

            <Card style={{ 
                backgroundColor: thread.color, 
                borderColor: thread.color,
                border: '2px solid white',
                borderRadius: '8px' 
                }}>
              <Card.Body>
                <Card.Title style={{ color: 'white' }}>
                  <a href="#" onClick={() => handleThreadClick(thread)}
                    style={{ color: 'Bone', textDecoration: 'none' }}>
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
              <Card 
                style={{ 
                    backgroundColor: selectedThread.color, 
                    border: '2px solid white',
                    borderRadius: '8px' 
                }}
                ></Card>
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