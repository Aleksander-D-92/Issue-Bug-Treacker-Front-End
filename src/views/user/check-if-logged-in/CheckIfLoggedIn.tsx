import React, {useEffect} from "react";
import {useDispatch} from 'react-redux'
import {readCookieByKeyName} from "../../shared/cookieUtils";

function CheckIfLoggedIn() {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = readCookieByKeyName('jwt');
        if (token !== null) {
            let jwtPayload = JSON.parse(atob(token.split('.')[1])); //parse the JWT payload to JSON object
            dispatch({
                type: 'userDetails', payload: {
                    id: jwtPayload.id,
                    username: jwtPayload.sub,
                    authority: jwtPayload.authorities,
                    exp: jwtPayload.exp,
                    authorizationHeader: `Bearer ${token}`
                }
            })
            dispatch({type: 'userLoggedIn'})
        }
    }, [])

    return <></>;
}

export {CheckIfLoggedIn}
