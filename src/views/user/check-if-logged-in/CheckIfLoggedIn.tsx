import React, {useEffect} from "react";
import {useDispatch} from 'react-redux'

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


    function readCookieByKeyName(name: string) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    return null
}

export {CheckIfLoggedIn}
