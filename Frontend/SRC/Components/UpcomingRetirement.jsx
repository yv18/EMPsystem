import React, { Component } from "react";
import Navbar from "./Navbar.jsx";
import { Table, Form, Container, Row, Col } from "react-bootstrap";

class UpcomingRetirement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      FutureRetirementData: false, // Filter for upcoming retirement
      empFilterType: "" // Filter for employee
    };
  }

  componentDidMount() {
    this.FethEmpData();
  }

  async FethEmpData() {
    try {
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: "{ retriveUserInformation { _id FirstName LastName Age DateOfJoining Title Department EmployeeType CurrentStatus }}" }),
      });
      const { data } = await response.json();
      this.setState({ data: data.retriveUserInformation || [] });
    } catch (error) {
      console.error("Error", error);
    }
  }

  handleUpcomingRetData = (event) => {
    this.setState({ FutureRetirementData: event.target.checked });
  };

  handleEmployeeTypeFilterChange = (event) => {
    this.setState({ empFilterType: event.target.value });
  };

  render() {
    const { data, FutureRetirementData, empFilterType } = this.state;

    // Calculate retirement date for employees
    const today = new Date();
    const SixMonthsGap = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

    //Filter data based on upcoming Retirement
    let ModifyDetails = data.filter((user) => {
      const RetDate = new Date(user.DateOfJoining);
      RetDate.setFullYear(RetDate.getFullYear() + 65); //consider retirement age is 65
      return (
        (!FutureRetirementData || RetDate <= SixMonthsGap) &&
        (!empFilterType || user.EmployeeType === empFilterType)
      );
    });

    return (
      <>
      <Navbar />
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="FutureRetirementData">
                <Form.Check
                  type="checkbox"
                  label="Upcoming Retirement"
                  style={{margin:"20px"}}
                  checked={FutureRetirementData}
                  onChange={this.handleUpcomingRetData}
                />
              </Form.Group>
              <Form.Group style={{margin:"20px", width:"200px"}} controlId="empFilterType">
                <Form.Label>Select Employee Type</Form.Label>
                <Form.Control as="select" value={empFilterType} onChange={this.handleEmployeeTypeFilterChange}>
                  <option value="">All</option>
                  <option value="FullTime">Full-Time</option>
                  <option value="PartTime">Part-Time</option>
                  <option value="Seasonal">Seasonal</option>
                  <option value="Contract">Contract</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Age</th>
                  <th>DateOfJoining</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>EmployeeType</th>
                  <th>CurrentStatus</th>
                </tr>
              </thead>
              <tbody> {/* To render the employee data */}
                {ModifyDetails.map((BY) => (
                  <tr key={BY._id}>
                    <td>{BY.FirstName}</td>
                    <td>{BY.LastName}</td>
                    <td>{BY.Age}</td>
                    <td>{BY.DateOfJoining}</td>
                    <td>{BY.Title}</td>
                    <td>{BY.Department}</td>
                    <td>{BY.EmployeeType}</td>
                    <td>{BY.CurrentStatus ? "Working": "Retired"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default UpcomingRetirement;
// Exported the class