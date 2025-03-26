import React from'react';
import { Row, Col, Card, Container } from'react-bootstrap';


const Home: React.FC = () => {
  return (
    <Container fluid>
       
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="title">About The Old Internet</h1>
        </Col>
      </Row>
      <Row>
          <Col xs={6} sm={4} md={3} lg={2}>
            <Card style={{ backgroundColor: '#FF9900', borderColor: '#FF9900' }}>
              <Card.Body>
              <Card.Text>
                <p className="body">Welcome to Form, the ultimate platform for 
                    creating dynamic forms and engaging chat rooms. Whether you're building a community, 
                    gathering feedback, or sparking discussions, 
                    we make it easy for users to create and customize their own spaces. 
                    Inspired by platforms like Discord and Reddit, our mission is to empower people to connect, 
                    share, and collaborate effortlessly.Join us and start building your 
                    own interactive communities today!</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
  = <div
              className='p-5 text-center bg-image'
              style={{ backgroundImage: "url('file:///Users/matthewunrein/Downloads/alin-andersen-X-wKVg193Ao-unsplash.jpg')", height: 400 }}
          ></div>
      </Row>
    </Container>
  );
}
export default Home;
