import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
import {ReduxState} from "../../configuration/redux/reduxStrore";


function ProjectsTable() {
    const state = useSelector(((state: ReduxState) => state));
    useEffect(() => {
        axios.get('/projects/get-all-projects', {
            headers: {
                Authorization: state.userDetails.authorizationHeader
            }
        }).then((e) => {
            console.log(e.data);
        })
    })
    return (
        <div>div</div>
    )
}

export {ProjectsTable}
