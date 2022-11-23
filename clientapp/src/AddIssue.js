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
      //form.reset();
    }
  
    return (
      <>
        <h2>Add Issue</h2>
        <form name='addForm' onSubmit={handleSubmit}>
          <select name='status'>
            {['New', 'Assigned', 'Fixed', 'Closed'].map((val,index) =>
              <option key={index} value={val}>
                {val}
              </option>
            )}
          </select>
          <input type='text' name='author' placeholder='Author' />
          <input type='number' name='effort' placeholder='Effort' />
          <input type='text' name='title' placeholder='Title' />
          <button type='submit'>Submit</button>
        </form>
      </>
    );
};

export default AddIssue;