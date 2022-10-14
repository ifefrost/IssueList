// Issue filter Component to filter the issues in the tables
const IssueFilter = () => {
  return <h1>Issue Filter</h1>;
};

// Issue Row Component: template for the issues displayed in the table
// issueList is the object containing the issue details
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
    </tr>
  );
};

// Issue Table Component: containing the table of issues
// issues is the object containing the issues
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

// Add Issue Component: to add a new issue to the table
// this component is a child of the IssueList component
// AddSingleIssue is the function to add a single issue to the table
// and is passed as a prop from the IssueList component
const AddIssue = ({ AddSingleIssue }) => {
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
      effort: parseInt(form.effort.value),
      title: form.title.value,
    };

    // we dont use useEffect hook here because we want to
    // add the issue only when the user clicks on the submit button
    // not automatically on component render or re-renderf
    AddSingleIssue(newIssue);
    form.reset();
  }

  return (
    <>
      <h1>Add Issue</h1>
      <form name='addForm' onSubmit={handleSubmit}>
        <input type='text' name='status' placeholder='Status' /> <br />
        <input type='text' name='author' placeholder='Author' /> <br />
        <input type='number' name='effort' placeholder='Effort' /> <br />
        <input type='text' name='title' placeholder='Title' /> <br />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

const IssueList = () => {
  // const tempIssues = [
  //   {
  //     id: 1,
  //     status: "Assigned",
  //     author: "Random Person",
  //     effort: 5,
  //     created: new Date("2022-09-18"),
  //     due: new Date("2022-09-19"),
  //     title: "This is the First issue",
  //   },
  //   {
  //     id: 2,
  //     status: "Pending",
  //     author: "Designated Person",
  //     effort: 10,
  //     created: new Date("2022-09-17"),
  //     due: new Date("2022-09-20"),
  //     title: "This is the Second issue",
  //   },
  // ];

  const [issues, setIssues] = React.useState([]);

  const query = `query {
    issueList {
      id title status author
      created effort due
    }
  }`;

  const fetchIssueList = () => {
    fetch("/graphql", {
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

    // newIssue.id = issues.length + 1;
    // let IssueList = issues.slice();
    // IssueList.push(newIssue);
    // console.log(IssueList);
    // setIssues(IssueList);
    // tempIssues.push(newIssue);
    // setIssues(tempIssues);
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

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<IssueList />);
