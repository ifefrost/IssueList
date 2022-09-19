const IssueFilter = () => {
  return /*#__PURE__*/React.createElement("h1", null, "Issue Filter");
};

const IssueRow = props => {
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: props.rowStyle
  }, props.id), /*#__PURE__*/React.createElement("td", {
    style: props.rowStyle
  }, props.title));
};

const IssueTable = () => {
  const rowStyle = {
    border: "1px solid black"
  };
  const issues = [{
    id: 5,
    title: "This is the Fifth issue"
  }, {
    id: 6,
    title: "This is the Sixth issue"
  }];
  const displayIssues = issues.map(issue => /*#__PURE__*/React.createElement(IssueRow, {
    rowStyle: rowStyle,
    id: issue.id,
    title: issue.title
  }));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "This is a placeholder for the Issue Table"), /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "ID"), /*#__PURE__*/React.createElement("th", {
    style: rowStyle
  }, "TITLE"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "1"), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "This is the First Issue")), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "2"), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "This is the Second Issue")), /*#__PURE__*/React.createElement(IssueRow, {
    rowStyle: rowStyle,
    id: 3,
    title: "This is the Third issue"
  }), /*#__PURE__*/React.createElement(IssueRow, {
    rowStyle: rowStyle,
    id: 4,
    title: "This is the Fourth issue"
  }), displayIssues)));
};

const AddIssue = () => {
  return /*#__PURE__*/React.createElement("h1", null, "Add Issue");
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render( /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(IssueFilter, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(IssueTable, null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(AddIssue, null)));