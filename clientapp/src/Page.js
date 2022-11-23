import { Link, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import PageRoutes from './PageRoutes';

const Page = () => {
    return (
        <Router>
            <div>
                <nav>
                    <Link to={"/"}>Home</Link>
                    {' | '}
                    <Link to={"/issues"}>Issue List</Link>
                    {' | '}
                    <Link to={"/report"}>Report</Link>
                </nav>
            </div>
        <PageRoutes />
        </Router>
    );
};

export default Page;