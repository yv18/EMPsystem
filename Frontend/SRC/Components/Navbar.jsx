import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/" style={{ marginLeft: "10px" }}>BYR</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/AddNewEmployee">Add New Employee</Nav.Link>
        <Nav.Link as={Link} to="/filter">Filter & Update</Nav.Link>
        <Nav.Link as={Link} to="/Retire">Upcoming Retirement</Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
