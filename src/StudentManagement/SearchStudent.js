import React from "react";

const SearchStudent = () => {
    return (
        <div className="d-flex justify-content-end py-5 bg-light">
            <input type="text" className="form-control" />
            <button className="btn btn-success">Search</button>
        </div>
    );
};

export default SearchStudent;
