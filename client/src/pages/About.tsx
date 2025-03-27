import React from'react';
import { Row, Col, Card, Container } from'react-bootstrap';
//import myImage from "../assets/Pixel-Pit.png";
import styled from "styled-components";

const Divider = styled.div`
  width: 100%;
  height: 5px;
  background-color: #fca311;
  margin: 20px 0;
`;

const Home: React.FC = () => {
  return (
    <div>
    <Container fluid>
       
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h1 className="title">About The Old Internet</h1>
        </Col>
      </Row>
      <Row>
          <Col xs={6} sm={4} md={3} lg={2}>
            <Card style={{
                    border: '2px solid #ffffff',
                    borderRadius: '8px',
                  }}>
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
      </Row>
    </Container>

 <div style={{ marginBottom: "40px" }}></div> {/* Adds space below */}

 <>
 
   <Container>
     {/* Content */}
   </Container>
  <Divider />
   <div className="container">
     {/* More content */}
   </div>
 </>

 <div style={{ marginBottom: "40px" }}></div> {/* Adds space below */}

     <div className="container">
       <footer className="py-3 my-4">
         <ul className="nav justify-content-center border-bottom pb-3 mb-3">
         
           <div className="image-container">
         <img
           //src={myImage}
           alt="My Image"
           className="foreground-image"
           style={{ width: '100px', height: 'auto' }}
         />
         </div>
         </ul>
         <p className="text-center text-body-secondary" style={{ color: "#fca311" }}>
           &copy;  Pixel Pit, 2025 Company
         </p>
       </footer>
     </div>
   </div>
 );
};
export default Home;
