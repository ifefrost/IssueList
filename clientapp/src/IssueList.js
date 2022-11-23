import React from 'react';
import IssueFilter from './IssueFilter';
import IssueTable from './IssueTable';
import AddIssue from './AddIssue';
import { useLocation } from 'react-router-dom';

const IssueList = () => {

    const [issues, setIssues] = React.useState([]);
    // const {handleIssue} = useParams();
    const search = useLocation().search;
    const value = new URLSearchParams(search).get('author');
    const query = `query {
      issueList {
        _id id title status author
        created effort due
      }
    }`;
  
    const fetchIssueList = (value) => {
      fetch("http://localhost:3001/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (value) {
            setIssues(result.data.issueList.filter((issue) => 
            issue.author === value)
            );
          } else {
            setIssues(result.data.issueList);
          }
        });
    };
  
    React.useEffect(() => {
      fetchIssueList(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
  
    const AddSingleIssue = async (newIssue) => {
      let enteredIssue = newIssue;
      console.log(enteredIssue);
  
      const query = `mutation {
        addSingleIssue(issue: {
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
      await fetch("http://localhost:3001/graphql", {
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