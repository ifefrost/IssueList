import React from 'react';
import { Link } from 'react-router-dom';

const IssueRow = ({ issue }) => {
    // returns the view of each row in the table
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.author}</td>
        <td>{issue.effort}</td>
        <td>{issue.created.toString()}</td>
        <td>{issue.due.toString()}</td>
        <td>{issue.title}</td>
        <td><Link to={`/edit/${issue._id}`}>Edit</Link></td>
      </tr>
    );
};

export default IssueRow;