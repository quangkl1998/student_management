import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchStudent } from "../reducers/studentReducer";

const SearchStudent = () => {
    const [searchValue, setSearchValue] = useState();
    const dispatch = useDispatch();

    return (
        <div className="d-flex justify-content-end py-5 bg-light">
            <input
                type="text"
                className="form-control"
                value={searchValue}
                onChange={(evt) => setSearchValue(evt.target.value)}
            />
            <button
                className="btn btn-success"
                onClick={() => dispatch(searchStudent(searchValue))}
            >
                Search
            </button>
        </div>
    );
};

export default SearchStudent;
