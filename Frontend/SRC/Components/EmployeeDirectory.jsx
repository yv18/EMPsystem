import React, { Component } from "react";
import { Link } from "react-router-dom";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import EmpSearchByFilter from "./EmployeeSearch.jsx";
import NavigationBar from "./Navbar.jsx";

class EmployeeDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dept: '',
      title: '',
      type: '',
      epmStoredData: []
    };
    this.RetriveEmpData = this.RetriveEmpData.bind(this);
    this.getFilterData = this.getFilterData.bind(this);
  }

  componentDidMount() {
    this.RetriveEmpData();
  }
  // For retriving the data
  RetriveEmpData() {
    let query = `
      query {
        retriveUserInformation {
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
      let res = await response.json();
      let data = res.data.retriveUserInformation;
      this.setState({ epmStoredData: data || [] });
    });
  }

  getFilterData(Y) {
    const GetUrlfromBrowser = new URLSearchParams(Y.target.search);
    let EmpDept = GetUrlfromBrowser.get('dept');
    let EmpType = GetUrlfromBrowser.get('type');
    let EmpTitle = GetUrlfromBrowser.get('title');
    this.setState({ dept: EmpDept, type: EmpType, title: EmpTitle });
  }

  render() {
    const { dept, title, type, epmStoredData } = this.state;
    return (
      <div>
        <NavigationBar />
        <EmpSearchByFilter getFilterData={this.getFilterData} /> {/*  For Filtering the employee */}
        <EmployeeTable RetriveEmpData={this.RetriveEmpData} data={epmStoredData} EmpDept={dept} EmpTitle={title} EmpType={type}/> {/* For displaying the data according to the filter thet user select */}
      </div>
    );
  }
}

export default EmployeeDirectory;
