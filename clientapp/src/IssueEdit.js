import React from 'react';
import {useParams} from 'react-router-dom';
import  URLSearchParams from 'url-search-params';

const IssueEdit = () => {
    const id = useParams();

    const [issue, setIssue] = React.useState({});
    // const [isUpdated, setIsUpdated] = React.useState(false);
    console.log(id);

    const query = `
        mutation {
            foundIssue(_id: "${id._id}") {
                _id
                id
                status
                author
                effort
                created
                due
                title
            }
        }`;

    function fetchIssue() {
        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        }).then(response => response.json())
            .then((result) => {
                console.log(result);
                setIssue(result.data.foundIssue);
            });
    }

    React.useEffect(() => {
        let params = window.location.search;
        let queryParams = new URLSearchParams(params);
        console.log(queryParams);
        fetchIssue();
    });

    const handleUpdate = (e) => {
        e.preventDefault()

        const form = document.forms.editForm;

        let issueObj = {
            _id: issue._id,
            status: form.status.value,
            author: form.author.value,
            effort: parseInt(form.effort.value),
            title: form.title.value,
        };

        const query = `
            mutation {
                updateIssue(modifyIssue: 
                    {_id: "${issue._id}" status: ${issueObj.status}, 
                    author: "${issueObj.author}", effort: ${issueObj.effort}, title: "${issueObj.title}"})
                }
            `;

        fetch('http://localhost:3001/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            const result = await response.json();
            console.log(result);
        });


    }

    return (
        <>
            <h1>Issue Edit</h1>
            <form name='editForm' onSubmit={handleUpdate}>
                <select name='status' defaultValue={issue.status}>
                    {['New', 'Assigned', 'Fixed', 'Closed']
                    .map((val, index) =>
                        <option key={index} value={val}>
                            {val}
                        </option>
                    )}
                </select>
                <input type='text' name='author' placeholder='Author' defaultValue={issue.author}/>
                <input type='number' name='effort' placeholder='Effort' defaultValue={issue.effort} />
                <input type='text' name='title' placeholder='Title' defaultValue={issue.title} />
                <button type='submit'>Submit</button>
            </form>
        </>
    );
}

export default IssueEdit;