import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Alert, Table, Container, Row, Col } from 'react-bootstrap';
import EmployeeDetails from './EmployeeDetails.jsx';


class EmployeeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notDelet: "",
      __deletionMessage: "", // this will  be used to display a message when an employee is deleted
      ViewPersonDetails: null, // to store the details of the selected employee
      LeftTime: { years: 0, months: 0, days: 0 } // initialize remainingTime
    };
  }

  calcRetTime = (DateoFRetirement, age) => {
    const PresentDate = new Date();
    // Check if retirement date has already passed or not
    if (DateoFRetirement < PresentDate) {
      return { years: 0, months: 0, days: 0 };
    }
    const differ = DateoFRetirement - PresentDate;
    const days = Math.floor(differ / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const leftDays = days % 30;
    return { years, months, days: leftDays };
  };

  calcDaysLeft = () => {
    const { ViewPersonDetails } = this.state;
    if (ViewPersonDetails) {
      const dateOfJoiningEmp = new Date(ViewPersonDetails.DateOfJoining);
      const currentDate = new Date();
  
      //for calculating the age
      let age = currentDate.getFullYear() - dateOfJoiningEmp.getFullYear();
      const monthdiffererence = currentDate.getMonth() - dateOfJoiningEmp.getMonth();
      if (monthdiffererence < 0 || (monthdiffererence === 0 && currentDate.getDate() < dateOfJoiningEmp.getDate())) {
        age--;
      }
  
      // Predefine retirement age
      const PreDefineRetAge = 65;
  
      let FinalCalculatedYears = PreDefineRetAge - age;

      // Calculate remaining time until retirement
      let remainingYears = FinalCalculatedYears - ViewPersonDetails.Age;
  
      if (remainingYears < 0) {
        remainingYears = 0; //if its negative then it will be assign as zero
      }
  
      // Calculate retirement date
      const DateoFRetirement = new Date(dateOfJoiningEmp.getFullYear() + PreDefineRetAge, dateOfJoiningEmp.getMonth(), dateOfJoiningEmp.getDate());
  
      // Use the calcRetTime function
      const { years, months, days } = this.calcRetTime(DateoFRetirement, ViewPersonDetails.Age); 
  
      this.setState({
        LeftTime: {
          years: remainingYears,
          months,
          days,
          DateoFRetirement
        }
      });
    }
  };
  

  componentDidMount() {
    this.calcDaysLeft();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.ViewPersonDetails !== this.state.ViewPersonDetails) {
      this.calcDaysLeft();
    }
  }

  handleViewDetails = (employee) => {
    this.setState({ ViewPersonDetails: employee });
  };

  RemovePersonData = (id, currentStatus) => {
    if (currentStatus === true) {
      // Display message if current status is active
      this.setState({ notDelet: "CAN'T DELETE EMPLOYEE – STATUS ACTIVE" });
      setTimeout(() => {
        this.setState({ notDelet: "" });
      }, 3000);
      return;
    } else {
      let query = `
        mutation RemovePersonData {
          RemovePersonData(
            _id: "${id}"
          )
          {
            _id
          }
        }
      `;
      fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      }).then(async (response) => {
        let data = await response.json();
        this.props.RetriveEmpData();
        this.setState({ __deletionMessage: "Record has been deleted!" });
        setTimeout(() => {
          this.setState({ __deletionMessage: "" });
        }, 3000);
      });
    }
  };

  render() {
    const { data, EmpType, EmpTitle, EmpDept } = this.props;
    const { ViewPersonDetails, LeftTime } = this.state; 
  

    let ChangeInfo = data.filter((Y) => {
      return Y.EmployeeType === EmpType || Y.Title === EmpTitle || Y.Department === EmpDept;
    });

    let CollectionArray = !!ChangeInfo.length > 0 ? ChangeInfo : data;

    return (
      <Container fluid className="mt-4">
        <Row>
          <Col>
            {this.state.__deletionMessage && (
              <Alert variant="success">{this.state.__deletionMessage}</Alert>
            )}

            {this.state.notDelet && (
              <Alert variant="danger">{this.state.notDelet}</Alert>
            )}

            <Table striped bordered hover size="sm">
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {CollectionArray && CollectionArray.map((Y) => {
                  return (
                    <tr key={Y._id}>
                      <td>{Y.FirstName}</td>
                      <td>{Y.LastName}</td>
                      <td>{Y.Age}</td>
                      <td>{Y.DateOfJoining}</td>
                      <td>{Y.Title}</td>
                      <td>{Y.Department}</td>
                      <td>{Y.EmployeeType}</td>
                      <td>{Y.CurrentStatus ? "Working" : "Retired"}</td>
                      <td>
                        <Link to={`/update?id=${Y._id}`} style={{ marginLeft: "5px" }} variant="warning" params={{ EmpID: Y }}><Button variant="warning" className="updateLinkbtn">Update</Button></Link>
                        <Button variant="primary" style={{ marginLeft: "5px" }} onClick={() => this.handleViewDetails(Y)}>View</Button>
                        <Button variant="danger" style={{ marginLeft: "5px" }} className="deleteLinkbtn" onClick={() => this.RemovePersonData(Y._id, Y.CurrentStatus)}>Remove</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
        {/* Display the data  of selected employee so when whenever user clicks on view button it will display the data into the below table */}
        {ViewPersonDetails && (
          <EmployeeDetails
            ViewPersonDetails={ViewPersonDetails}
            LeftTime={LeftTime}
            onCloseDetails={() => this.setState({ ViewPersonDetails: null })}
          />
        )}
      </Container>
    );
  }
}

export default EmployeeTable;

