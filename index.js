const express = require("express");
require('./models/db');
const Issue = require('./models/issues');

// This is GraphQL code start
const { ApolloServer } = require("apollo-server-express");

const typeDefs = `
  input inputIssue {
    status: String!
    author: String
    effort: Int
    title: String
  }

  type issue {
    id: Int!
    status: String!
    author: String
    effort: Int
    created: String
    due: String
    title: String
  }
  type Query {
    about: String!
    issueList: [issue]
  }
  type Mutation {
    setAboutMessage(message: String!): String
    addSingleIssue(issue: inputIssue): issue
  }
  `;


  const resolvers = {
    Query: {
      about: () => aboutMessage,
      issueList
    },
    Mutation: {
      setAboutMessage,
      addSingleIssue,
    },
  };


  function addSingleIssue(_, {issue}) {
    const query = Issue.find({});
    query.count(function(err, count){
      let newIssue = {};
      newIssue.id = count + 1;
      newIssue.status = issue.status;
      newIssue.author = issue.author;
      newIssue.effort = issue.effort;
      newIssue.created = new Date();
      newIssue.due = new Date(new Date().getTime() + 1000*60*60*24*10);
      newIssue.title = issue.title;
      Issue.create(newIssue);
      return newIssue;
    })
    //   issue.id = count+1;
    //   issue.created = new Date();
    //   issue.due = new Date();

    //   console.log(issue);
    //   Issue.create(issue);
    //   return issue;
    // })
    // Issue.create(issue);
  }

  async function issueList(){
    return await Issue.find({});
    // return tempIssues
  }

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
