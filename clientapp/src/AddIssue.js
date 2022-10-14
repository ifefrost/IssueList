import React from 'react';

const AddIssue = ({ AddSingleIssue }) => {
  
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

export default AddIssue;