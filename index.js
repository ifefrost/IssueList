const express = require("express");

// This is GraphQL code start
const { ApolloServer } = require("apollo-server-express");

const typeDefs = `
  type Query {
    about: String!
  }
  type Mutation {
    setAboutMessage(message: String!): String
  }
  `;

  let aboutMessage = "Hello I am just a varaible";
  const resolvers = {
    Query: {
      about: () => aboutMessage,
    },
    Mutation: {
      setAboutMessage,
    },
  };

  function setAboutMessage(_, { message }) {
    return (aboutMessage = message);
  }

  const server = new ApolloServer({ typeDefs, resolvers });

// This is GraphQL code end
const app = express();
const PORT = 3000;

app.use(express.static("./public"));

// This is GraphQL code start
server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});

// This is GraphQL code end

app.get("/", (req, res) => {
  res.render("./index.html");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
