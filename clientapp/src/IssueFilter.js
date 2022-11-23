import React from 'react';
import { Link } from 'react-router-dom';

const IssueFilter = () => {
    return (
        <>
            <h2>Issue Filter</h2>
            <div>
                <Link to={'/'}>Back to Issue List</Link>
                {' | '}
                <Link to={'/?author=Somebody'}>Issues from Somebody</Link>
                {' | '}
                <Link to={'/?author=Unknown Person'}>Unkown Person Issues</Link>
            </div>
        </>
)};

export default IssueFilter;