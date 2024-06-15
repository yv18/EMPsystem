import React, { Component } from "react";
import { Button, Table, Container, Row, Col } from 'react-bootstrap';

class EmployeeDetails extends Component {
  render() {
    const { ViewPersonDetails, LeftTime, onCloseDetails } = this.props;
    return (
      <Row className="mt-4">
        <Col>
          <div>
            <h2>Employee Details</h2>
            <Table striped bordered hover variant="dark">
              <tbody>
                <tr>
                  <td>First Name:</td>
                  <td>{ViewPersonDetails.FirstName}</td>
                </tr>
                <tr>
                  <td>Last Name:</td>
                  <td>{ViewPersonDetails.LastName}</td>
                </tr>
                <tr>
                  <td>Age:</td>
                  <td>{ViewPersonDetails.Age}</td>
                </tr>
                <tr>
                  <td>Years Left for Retirement:</td>
                  <td>{LeftTime ? `${LeftTime.years} years, ${LeftTime.months} months, ${LeftTime.days} days` : "Processing..."}</td>
                </tr>
                <tr>
                  <td>Date of Joining:</td>
                  <td>{ViewPersonDetails.DateOfJoining}</td>
                </tr>
                <tr>
                  <td>Title:</td>
                  <td>{ViewPersonDetails.Title}</td>
                </tr>
                <tr>
                  <td>Department:</td>
                  <td>{ViewPersonDetails.Department}</td>
                </tr>
                <tr>
                  <td>Employee Type:</td>
                  <td>{ViewPersonDetails.EmployeeType}</td>
                </tr>
                <tr>
                  <td>Current Status:</td>
                  <td>{ViewPersonDetails.CurrentStatus ? "Working" : "Retired"}</td>
                </tr>
              </tbody>
            </Table>
            <Button variant="danger" onClick={onCloseDetails}>Close Details</Button>
          </div>
        </Col>
      </Row>
    );
  }
}

export default EmployeeDetails;
