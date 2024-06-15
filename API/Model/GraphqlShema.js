const Employee = require("./EmployeeShema");
require("./Database");


const typeDefs = `
    type User {
      FirstName: String!,
      LastName: String!,
      Age: String!,
      DateOfJoining: String!,
      Title: String!,
      Department: String!,
      EmployeeType: String
    }
    type RetriveEmployee {
      _id: String,
      FirstName: String!,
      LastName: String!,
      Age: String!,
      DateOfJoining: String!,
      Title: String!,
      Department: String!,
      EmployeeType: String,
      CurrentStatus: Boolean
    }
    type postUpdateData {
      _id:String,
      Title: String!,
      Department: String!,
      EmployeeType: String,
      CurrentStatus:Boolean
    }
    type Query {
        retriveUserInformation: [RetriveEmployee],
        updateUserByID(_id: String): RetriveEmployee
    }
    type delEmp {
      _id: String
    }
    type Mutation {
      PushEmployee( 
        FirstName: String!,
        LastName: String!,
        Age: String!,
        DateOfJoining: String!,
        Title: String!,
        Department: String!,
        EmployeeType: String): User,
        RemovePersonData(_id: String) : delEmp,
        postUpdateData( 
          _id:String,
          Title: String!,
          Department: String!,
          EmployeeType: String,
          CurrentStatus:Boolean
          ):postUpdateData
    }
`;

const resolvers = {
  Query: {
    retriveUserInformation: EmpDataRetrive,
    updateUserByID: updateUserByID,
  },
  Mutation: {
    PushEmployee: async (_, data) => {
      let NewData = new Employee({
        FirstName: data.FirstName,
        LastName: data.LastName,
        Age: data.Age,
        DateOfJoining: data.DateOfJoining,
        Title: data.Title,
        Department: data.Department,
        EmployeeType: data.EmployeeType,
      });
      const result = NewData.save().then((res) => {
        return res;
      });
      return result;
    },
    RemovePersonData: async (_, data) => {
      console.log("data", data),
        await Employee.deleteOne({ _id: data._id }).then((res) =>
          console.log("Rocord Deleted", res)
        );
    },
    postUpdateData: async (_, data) => {
      const id = { _id: data._id };
      const updateData = {
        Title: data.Title,
        Department: data.Department,
        EmployeeType: data.EmployeeType,
        CurrentStatus: data.CurrentStatus,
      };
      let savedData = await Employee.findOneAndUpdate(id, updateData);
      const result = savedData.save().then((res) => {
        console.log("Record updated", res);
        return res;
      });
      return result;
    },
  },
};

//For Retriving Employee Details
async function EmpDataRetrive() {
    return await Employee.find();
  }
  
// For Updating the data by ID which it will get from the url
  async function updateUserByID(_, data) {
    return await Employee.findById(data._id);
  }

module.exports = { typeDefs, resolvers, EmpDataRetrive,updateUserByID };


// so here I have added the graphqlschema for performing CRUD operations.