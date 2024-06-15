import React from "react";
import NavigationBar from "./Navbar.jsx";
import HomeTabel from "./HomeTable.jsx";
import { Container, Row, Col } from "react-bootstrap";

function Home() {
  return (
    <>
      <NavigationBar />
      <Container>
        <Row>
          <Col>
            <h1 style={{textAlign:"center", margin:"50px"}}>Welcome To the Home Page</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <HomeTabel />
          </Col>
        </Row>
      </Container>
    </>
  );
}
// So this the home page that have created and in this I also added  a navigation bar and Hometable component
export default Home;
