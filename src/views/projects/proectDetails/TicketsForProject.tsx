import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";


function TicketsForProject() {
    const state = useSelector((state: ReduxState) => state);
    const {projectId} = useParams();
    useEffect(() => {
        axios.get(`/tickets/get-by-project-id/${projectId}`, {
            headers: {Authorization: state.userDetails.authorizationHeader}
        }).then((e) => {
            console.log(e.data);
        });

    }, [])
    return (
        <React.Fragment>Todo add table mb</React.Fragment>
    )
}

export {TicketsForProject}
