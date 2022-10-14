import React from 'react';
import IssueRow from './IssueRow';

const IssueTable = ({ issues }) => {
    // issuesRow is an array mapping through the issues object
    // and returning the IssueRow components for each issue
    const issuesRow = issues.map((issue) => (
      <IssueRow key={issue.id} issue={issue} />
    ));
  
    // returns the view of the table with the array of IssueRow components
    // from the map above
    return (
      <>
        <h2>This is a placeholder for the Issue Table</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>AUTHOR</th>
              <th>EFFORT</th>
              <th>CREATED</th>
              <th>DUE</th>
              <th>TITLE</th>
            </tr>
          </thead>
          <tbody>{issuesRow}</tbody>
        </table>
      </>
    );
};

export default IssueTable;