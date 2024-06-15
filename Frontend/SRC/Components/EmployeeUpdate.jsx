import React, { Component } from "react";
import NavigationBar from './Navbar.jsx';
import { Toast,Alert,Button, Form } from 'react-bootstrap';



class EmployeeUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      removeRecordID: "", 
      updateEmp: {},
      updateMSG: "", // to display msg when data is updated
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(window.location.search); // this will get the url from browser
    const id = params.get('id');
    this.setState({ removeRecordID: id });
    this.RetriveDatabyID(id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.removeRecordID !== this.state.removeRecordID) {
      this.RetriveDatabyID(this.state.removeRecordID);
    }
  }

  // this will use for retrieving the user information
  RetriveDatabyID = (id) => {
    const query = `
      query {
        updateUserByID(_id:"${id}") {
          _id,
          FirstName,
          LastName,
          Age,
          DateOfJoining,
          Title,
          Department,
          EmployeeType,
          CurrentStatus
        }
      }
    `;

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then(async (response) => {
        const data = await response.json();
        this.setState({ updateEmp: data.data.updateUserByID });
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  // this will handle the form submission for updating employee data
  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const { removeRecordID } = this.state;
    const query = `
      mutation postUpdateData {
        postUpdateData(
          _id:"${removeRecordID}"
          Title: "${form.title.value}",
          Department: "${form.dept.value}",
          EmployeeType:"${form.emptype.value}",
          CurrentStatus: ${form.status.value}
        )
        {
          Title
        }
      }
    `;
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    })
      .then(async (response) => {
        const data = await response.json();
        form.reset();
        this.setState({ updateMSG: "Record has been updated!" }); // this will display msg 
        setTimeout(() => {
          this.setState({ updateMSG: "" });
        }, 3000);  // this will clear the msg after 3 seconds
      })
      .catch(error => console.error('Error in update section', error)); // this will catch error if got any
  };

  render() {
    const { updateEmp, updateMSG } = this.state;
    return (
      <>
      <NavigationBar/>
      <div style={{margin:"50px",display:"flex",justifyContent:"center", alignItems: 'center'}}>
        <div>
          <Form style={{width:"400px"}} name="updateForm" onSubmit={this.handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name: {updateEmp.FirstName}</Form.Label>
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name: {updateEmp.LastName}</Form.Label>
            </Form.Group>
            <Form.Group controlId="formAge">
              <Form.Label>Age: {updateEmp.Age}</Form.Label>
            </Form.Group>
            <Form.Group controlId="formDateOfJoining">
              <Form.Label>Date Of Joining: {updateEmp.DateOfJoining}</Form.Label>
            </Form.Group>
            <Form.Group controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control as="select" name="dept" defaultValue={updateEmp.Department}>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control as="select" name="title" defaultValue={updateEmp.Title}>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
                <option value="VP">VP</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formEmployeeType">
              <Form.Label>Employee Type</Form.Label>
              <Form.Control as="select" name="emptype" defaultValue={updateEmp.EmployeeType}>
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
                <option value="Contract">Contract</option>
                <option value="Seasonal">Seasonal</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Current Status:</Form.Label>
              <Form.Control as="select" name="status" defaultValue={!!updateEmp.CurrentStatus}>
                <option value={true}>Working</option>
                <option value={false}>Retired</option>
              </Form.Control>
            </Form.Group>

            {this.state.updateMSG && (
              <Alert variant="success" style={{marginTop:"10px"}}>{this.state.updateMSG}</Alert>
            )}

            <Button style={{marginTop:"10px", width:"100%"}} variant="warning" type="submit">Update</Button>

          </Form>
          
        </div>
      </div>
      </>
    );
  }
}

export default EmployeeUpdate;
