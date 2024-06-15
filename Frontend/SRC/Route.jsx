import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import EmployeeDirectory from "./Components/EmployeeDirectory.jsx";
import EmployeeCreate from "./Components/EmployeeCreate.jsx";
import EmployeeUpdate from "./Components/EmployeeUpdate.jsx";
import EmployeeTable from "./Components/EmployeeTable.jsx";
import Home from "./Components/Home.jsx";
import UpcomingRetirement from "./Components/UpcomingRetirement.jsx";


const NotFound = () => <h1>Error 404!</h1>; //this will display error when  the user enters an incorrect route



function LinksSetup() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddNewEmployee" element={<EmployeeCreate />} />
        <Route path="/filter" element={<EmployeeDirectory />} />
        <Route path="/Retire" element={<UpcomingRetirement />} />
        <Route path="/update" element={<EmployeeUpdate />} />
          <Route path=':EmpID' element={<EmployeeUpdate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default LinksSetup;