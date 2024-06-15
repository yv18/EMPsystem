import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';

function EmpSearchByFilter({ getFilterData }) {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={3}>
          <h4>Department</h4>
          <ListGroup>
            <ListGroup.Item as={Link} to={"/filter/?dept=IT"} onClick={getFilterData}>IT</ListGroup.Item>
            <ListGroup.Item as={Link} to={"/filter/?dept=Marketing"} onClick={getFilterData}>Marketing</ListGroup.Item>
            <ListGroup.Item as={Link} to={"/filter/?dept=HR"} onClick={getFilterData}>HR</ListGroup.Item>
            <ListGroup.Item as={Link} to={"/filter/?dept=Engineering"} onClick={getFilterData}>Engineering</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <h4>Title</h4>
          <ListGroup>
            <ListGroup.Item as={Link} to={"/filter/?title=Employee"} onClick={getFilterData}>Employee</ListGroup.Item>
            <ListGroup.Item as={Link} to={"/filter/?title=Manager"} onClick={getFilterData}>Manager</ListGroup.Item>
            <ListGroup.Item as={Link} to={"/filter/?title=Director"} onClick={getFilterData}>Director</ListGroup.Item>
            <ListGroup.Item as={Link} to={"/filter/?title=VP"} onClick={getFilterData}>VP</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <h4>Employee Type</h4>
          <ListGroup>
            <ListGroup.Item as={Link} to={"/filter/?type=FullTime"} onClick={getFilterData}>FullTime</ListGroup.Item>
            <ListGroup.Item as={Link} to={"/filter/?type=PartTime"} onClick={getFilterData}>PartTime</ListGroup.Item>
            <ListGroup.Item as={Link} to={"/filter/?type=Contract"} onClick={getFilterData}>Contract</ListGroup.Item>
            <ListGroup.Item as={Link} to={"/filter/?type=Seasonal"} onClick={getFilterData}>Seasonal</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default EmpSearchByFilter;
