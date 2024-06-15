const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const Employee = require("./Model/EmployeeShema");
const dotenv = require('dotenv');
require("./Model/Database");
const { typeDefs, resolvers, EmpDataRetrive, updateUserByID } = require('./Model/GraphqlShema.js');
// So here I have all imported the important files which is required from Model and also used modules.


const app = express();

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
}
// to connect the server


const PORT = process.env.PORT || 4000

app.listen(PORT, function () {
  startServer();
  console.log("App started on", PORT);
});
