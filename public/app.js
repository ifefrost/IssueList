// Issue filter Component to filter the issues in the tables
const IssueFilter = () => {
  return /*#__PURE__*/React.createElement("h1", null, "Issue Filter");
}; // Issue Row Component: template for the issues displayed in the table
// issueList is the object containing the issue details


const IssueRow = ({
  issue
}) => {
  // returns the view of each row in the table
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, issue.id), /*#__PURE__*/React.createElement("td", null, issue.status), /*#__PURE__*/React.createElement("td", null, issue.author), /*#__PURE__*/React.createElement("td", null, issue.created.toLocaleDateString()), /*#__PURE__*/React.createElement("td", null, issue.due.toLocaleDateString()), /*#__PURE__*/React.createElement("td", null, issue.title));
}; // Issue Table Component: containing the table of issues
// issues is the object containing the issues


const IssueTable = ({
  issues
}) => {
  // issuesRow is an array mapping through the issues object
  // and returning the IssueRow components for each issue
  const issuesRow = issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    key: issue.id,
    issue: issue
  })); // returns the view of the table with the array of IssueRow components
  // from the map above

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h2", null, "This is a placeholder for the Issue Table"), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "ID"), /*#__PURE__*/React.createElement("th", null, "STATUS"), /*#__PURE__*/React.createElement("th", null, "AUTHOR"), /*#__PURE__*/React.createElement("th", null, "CREATED"), /*#__PURE__*/React.createElement("th", null, "DUE"), /*#__PURE__*/React.createElement("th", null, "TITLE"))), /*#__PURE__*/React.createElement("tbody", null, issuesRow)));
}; // Add Issue Component: to add a new issue to the table
// this component is a child of the IssueList component
// AddSingleIssue is the function to add a single issue to the table
// and is passed as a prop from the IssueList component


const AddIssue = ({
  AddSingleIssue
}) => {
  // Use Effect Hook is used to run the function immediately after the component is rendered
  // React.useEffect(() => {
  //   console.log("useEffect called");
  //   //Add Single Issue to th state
  //   AddSingleIssue(newIssue);
  // }, []);
  // handleSubmit function is called when the form is submitted
  function handleSubmit(e) {
    e.preventDefault();
    let form = document.forms.addForm;
    let newIssue = {
      status: form.status.value,
      author: form.author.value,
      effort: form.effort.value,
      created: new Date(form.created.value),
      due: new Date(form.due.value),
      title: form.title.value
    }; // we dont use useEffect hook here because we want to 
    // add the issue only when the user clicks on the submit button
    // not automatically on component render or re-renderf

    AddSingleIssue(newIssue);
    form.reset();
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Add Issue"), /*#__PURE__*/React.createElement("form", {
    name: "addForm",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "status",
    placeholder: "Status"
  }), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "author",
    placeholder: "Author"
  }), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "effort",
    placeholder: "Effort"
  }), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "created",
    placeholder: "Created"
  }), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "date",
    name: "due",
    placeholder: "Due"
  }), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "title",
    placeholder: "Title"
  }), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Submit")));
};

const IssueList = () => {
  const tempIssues = [{
    id: 1,
    status: "Assigned",
    author: "Random Person",
    effort: 5,
    created: new Date("2022-09-18"),
    due: new Date("2022-09-19"),
    title: "This is the First issue"
  }, {
    id: 2,
    status: "Pending",
    author: "Designated Person",
    effort: 10,
    created: new Date("2022-09-17"),
    due: new Date("2022-09-20"),
    title: "This is the Second issue"
  }];
  const [issues, setIssues] = React.useState(tempIssues);

  const AddSingleIssue = newIssue => {
    newIssue.id = issues.length + 1;
    let IssueList = issues.slice();
    IssueList.push(newIssue);
    console.log(IssueList);
    setIssues(IssueList); // tempIssues.push(newIssue);
    // setIssues(tempIssues);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Issue Tracker"), /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, {
    issues: issues
  }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(AddIssue, {
    AddSingleIssue: AddSingleIssue
  }));
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(IssueList, null));