import React from 'react';
import IssueFilter from './IssueFilter';
import IssueTable from './IssueTable';
import AddIssue from './AddIssue';

const IssueList = () => {

    const [issues, setIssues] = React.useState([]);
  
    const query = `query {
      issueList {
        id title status author
        created effort due
      }
    }`;
  
    const fetchIssueList = () => {
      fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
        .then((response) => response.json())
        .then((result) => {
          setIssues(result.data.issueList);
        });
    };
  
    React.useEffect(() => {
      fetchIssueList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    const AddSingleIssue = (newIssue) => {
      let enteredIssue = newIssue;
      console.log(enteredIssue);
  
      const query = `mutation addSingleIssue {
        addSingleIssue(issue: {
          status: "${enteredIssue.status}",
          author: "${enteredIssue.author}",
          effort: ${enteredIssue.effort},
          title: "${enteredIssue.title}"
        }) {
          id
          status
          author
          effort
          created
          due
          title
        }
      }`;
      fetch("/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      }).then(async (response) => {
        let data = await response.json();
        console.log(data);
        fetchIssueList();
      });
    };
  
    return (
      <>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <AddIssue AddSingleIssue={AddSingleIssue} />
      </>
    );
};

export default IssueList;