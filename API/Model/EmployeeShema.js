const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    FirstName: String,
    LastName: String,
    Age: String,
    DateOfJoining: String,
    Title: String,
    Department: String,
    EmployeeType: String,
    CurrentStatus: {type: Boolean, default:true}
});

const Employee = mongoose.model('Employee', EmployeeSchema,);
module.exports = Employee;

// so this is the mongodb shema for collecting the deatis of employees in database