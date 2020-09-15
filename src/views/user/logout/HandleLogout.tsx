import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";
import {removeAllCookies} from "../../shared/cookieUtils";


function HandleLogout() {
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        dispatch({type: 'userLoggedOut'});
        dispatch({type: 'userDetails', payload: {}})
        removeAllCookies();
        history.push("/users/login");
    })
    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
        </motion.div>
    )
}

export {HandleLogout}
