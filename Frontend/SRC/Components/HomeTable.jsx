import React, { Component } from "react";
import { Table } from "react-bootstrap";

class HomeTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
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

  render() {
    return (
      <div>
        <Table striped bordered hover>
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
          <tbody>
            {this.state.data.map((Y) => (
              <tr key={Y._id}>
                <td>{Y.FirstName}</td>
                <td>{Y.LastName}</td>
                <td>{Y.Age}</td>
                <td>{Y.DateOfJoining}</td>
                <td>{Y.Title}</td>
                <td>{Y.Department}</td>
                <td>{Y.EmployeeType}</td>
                <td>{Y.CurrentStatus ? "Working" : "Retired"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default HomeTable;
