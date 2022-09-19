const IssueFilter = () => {
  return <h1>Issue Filter</h1>;
};

const IssueRow = (props) => {
  return (
    <tr>
      <td style={props.rowStyle}>{props.id}</td>
      <td style={props.rowStyle}>{props.title}</td>
    </tr>
  )
}

const IssueTable = () => {
  const rowStyle = {border:"1px solid black"};
  const issues = [
    {id: 5, title: "This is the Fifth issue"},
    {id: 6, title: "This is the Sixth issue"}
  ];

  const displayIssues = issues.map(issue => 
    <IssueRow rowStyle={rowStyle} id={issue.id} title = {issue.title} />
  )

  return (
    <div>
      <h2>This is a placeholder for the Issue Table</h2>
      <table style={{borderCollapse:"collapse"}}>
        <thead>
          <tr>
            <th style={rowStyle}>ID</th>
            <th style={rowStyle}>TITLE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={rowStyle}>1</td>
            <td style={rowStyle}>This is the First Issue</td>
          </tr>
          <tr>
            <td style={rowStyle}>2</td>
            <td style={rowStyle}>This is the Second Issue</td>
          </tr>
          <IssueRow rowStyle ={rowStyle} id={3} title={"This is the Third issue"}/>
          <IssueRow rowStyle ={rowStyle} id={4} title={"This is the Fourth issue"}/>
          {displayIssues}
        </tbody>
      </table>
    </div>
  );
};

const AddIssue = () => {
  return <h1>Add Issue</h1>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <IssueFilter />
    <hr />
    <IssueTable />
    <hr />
    <AddIssue />
  </React.StrictMode>
);
