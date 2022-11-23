import React from "react";
import {Route, Routes} from "react-router-dom";
import IssueList from "./IssueList";
import IssueEdit from "./IssueEdit";
import IssueFilter from "./IssueFilter";

const NotFound = () => <h1>Error: This Page doesnt exist</h1>;

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<IssueList />} />
            <Route path="/edit/:_id" element={<IssueEdit />} />
            <Route path="/report" element={<IssueFilter />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}

export default PageRoutes;