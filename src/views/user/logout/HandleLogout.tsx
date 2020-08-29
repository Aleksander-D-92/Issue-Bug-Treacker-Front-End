import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteAllCookies} from "../../shared/functions";


function HandleLogout() {
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        dispatch({type: 'userLoggedOut'});
        dispatch({type: 'userDetails', payload: {}})
        deleteAllCookies();
        history.push("/users/login");
    })
    return (
        <div>HandleLogout</div>
    )
}

export {HandleLogout}
