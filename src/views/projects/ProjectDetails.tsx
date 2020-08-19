import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
import {ReduxState} from "../../configuration/redux/reduxStrore";

//todo
function ProjectDetails() {
    const state = useSelector(((state: ReduxState) => state));
    useEffect(() => {
        axios.get('', {
            headers: {Authorization: state.userDetails.authorizationHeader}
        }).then((e) => {
            console.log(e);
        })
    }, [])
    return (
        <h1>Project Details view</h1>
    )
}

export {ProjectDetails}
