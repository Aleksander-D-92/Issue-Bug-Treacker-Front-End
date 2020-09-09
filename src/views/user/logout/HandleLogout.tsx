import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteAllCookies} from "../../shared/functions";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";


function HandleLogout() {
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        dispatch({type: 'userLoggedOut'});
        dispatch({type: 'userDetails', payload: {}})
        deleteAllCookies();
        history.push("/users/login");
    }, [dispatch, history])
    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        ></motion.div>
    )
}

export {HandleLogout}
