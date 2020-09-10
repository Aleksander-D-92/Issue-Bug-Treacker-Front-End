import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {routerVariant} from "../shared/gobalVariables";

function LandingPage() {
    useEffect(() => {

    }, [])
    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <h1>Landing page </h1>
        </motion.div>
    )
}

export {LandingPage}
