import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import {ReduxState} from "../../configuration/redux/reduxStrore";

function AllTicketsView() {
    const state = useSelector((state: ReduxState) => state);
    useEffect(() => {
        axios.get(`/tickets?action=all`).then((e) => {
            console.log(e.data)
        })
    }, [])
    return (
        <React.Fragment>div</React.Fragment>
    )
}

export {AllTicketsView}
