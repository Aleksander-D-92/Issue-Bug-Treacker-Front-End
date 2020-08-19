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
    let cookies = document.cookie.split("; ");
    for (let c = 0; c < cookies.length; c++) {
        let d = window.location.hostname.split(".");
        while (d.length > 0) {
            let cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            let p = window.location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            }
            d.shift();
        }
    }
}

export {HandleLogout, deleteAllCookies}
