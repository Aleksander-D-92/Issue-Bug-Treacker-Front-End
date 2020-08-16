import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";


function HandleLogout() {
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        dispatch({type: 'userLoggedOut'});
        deleteAllCookies();
        history.push("/");
    })
    return (
        <div>HandleLogout</div>
    )
}

function deleteAllCookies() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export {HandleLogout, deleteAllCookies}
