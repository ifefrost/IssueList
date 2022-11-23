const express = require("express");
const fs = require("fs");
require('./models/db');
const Issue = require('./models/issues');

// This is GraphQL code start
const { ApolloServer } = require("apollo-server-express");

let aboutMessage = "About message tester";

  const resolvers = {
    Query: {
      about: () => aboutMessage,
      issueList
    },
    Mutation: {
      setAboutMessage,
      addSingleIssue,
      foundIssue,
      updateIssue
    },
  };

  async function updateIssue(_, {modifyIssue}) {
    console.log(modifyIssue);
    if(modifyIssue._id){
      await Issue.findOneAndUpdate({_id: modifyIssue._id}, {
        title: modifyIssue.title,
        author: modifyIssue.author,
        effort: modifyIssue.effort,
        status: modifyIssue.status,
      });
      return true;
    } else {
      return false;
    }
  }
  
  async function foundIssue(_, {_id}){
    console.log(_id);
    return await Issue.findById(_id);
  }

  async function addSingleIssue(_, {issue}) {
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

  async function issueList(_, {author}){
    console.log(author);
    let query = Issue.find({});
    if(author){
      query.or({author: author});
    }
    console.log(query);
    return await query.exec();
    // return tempIssues
  }

  function setAboutMessage(_, { message }) {
    return (aboutMessage = message);
  }

  const server = new ApolloServer({ 
    typeDefs: fs.readFileSync('graphql_schema', 'utf-8'),
    resolvers, });

// This is GraphQL code end
const app = express();
const PORT = 3001;

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
