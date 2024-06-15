import React, { Component } from "react";
import { Button, Form, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import NavigationBar from './Navbar.jsx';

class EmployeeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FnameValidation: "",
      LnameValidation: "",
      AgeValidation: "",
      DateValidation: "",
      msgToDisplay: ""
    };
    this.dformhandle = this.dformhandle.bind(this);
  }

  // form handler
  dformhandle(e) {
    e.preventDefault();
    const form = e.target;
    if (
      form.oneName.value === "" ||
      form.secondname.value === "" ||
      form.dateofjoin.value === "" ||
      form.age.value === ""
    ) {
      this.setState({
        FnameValidation: form.oneName.value === "" ? "Check Your First Name" : "",
        LnameValidation: form.secondname.value === "" ? "Check Your Last Name" : "",
        DateValidation: form.dateofjoin.value === "" ? "Please select date of join" : "",
        AgeValidation: form.age.value === "" ? "Enter Your Age" : ""
      });
      return;
    }

    // this will check the all fields
    if (form.age.value < 20 || form.age.value > 70) {
      this.setState({
        AgeValidation: "Person with the same age exists. Enter age between 20 to 70"
      });
      return;
    }

    // If all checks pass then reset error msg
    this.setState({
      FnameValidation: "",
      LnameValidation: "",
      AgeValidation: "",
      DateValidation: "",
      msgToDisplay: "Employee data has been stored!"
    });

    // this query is used for creating new employee Record into MongoDB
    let query = `
      mutation PushEmployee {
        PushEmployee(
          FirstName: "${form.oneName.value}",
          LastName: "${form.secondname.value}",
          Age: "${form.age.value}",
          DateOfJoining: "${form.dateofjoin.value}",
          Title: "${form.title.value}",
          Department: "${form.empdept.value}",
          EmployeeType:"${form.typeofEmp.value}"
        )
        {
          FirstName
        }
      }
    `;
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    }).then(async (response) => {
      let data = await response.json();
      form.reset();
    });
  }

  render() {
    const { FnameValidation, LnameValidation, AgeValidation, DateValidation, msgToDisplay } = this.state;

    return (
      <>
        <NavigationBar />
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <Form name="empform" onSubmit={this.dformhandle}>
                <FormGroup>
                  <FormLabel>First Name</FormLabel>
                  <FormControl type="text" name="oneName" />
                  {FnameValidation && <span style={{ color: "red" }}>{FnameValidation}</span>}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl type="text" name="secondname" />
                  {LnameValidation && <span style={{ color: "red" }}>{LnameValidation}</span>}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Age</FormLabel>
                  <FormControl type="number" name="age" />
                  {AgeValidation && <span style={{ color: "red" }}>{AgeValidation}</span>}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Date Of Join</FormLabel>
                  <FormControl type="date" name="dateofjoin" />
                  {DateValidation && <span style={{ color: "red" }}>{DateValidation}</span>}
                </FormGroup>
                <FormGroup>
                  <FormLabel>Department</FormLabel>
                  <FormControl as="select" name="empdept">
                    <option>IT</option>
                    <option>Marketing</option>
                    <option>HR</option>
                    <option>Engineering</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Title</FormLabel>
                  <FormControl as="select" name="title">
                    <option>Employee</option>
                    <option>Manager</option>
                    <option>Director</option>
                    <option>VP</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <FormLabel>EmployeeType</FormLabel>
                  <FormControl as="select" name="typeofEmp">
                    <option>FullTime</option>
                    <option>PartTime</option>
                    <option>Contract</option>
                    <option>Seasonal</option>
                  </FormControl>
                </FormGroup>
                {msgToDisplay && <div style={{ color: "green" }}>{msgToDisplay}</div>} {/*  To display the message */}
                <Button type="submit" style={{ marginTop:"10px", width:"100%"}} variant="dark">Add</Button>
              </Form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EmployeeCreate;
