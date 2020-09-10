import React from "react";
import {motion} from "framer-motion";
import {routerVariant} from "../shared/gobalVariables";
import './Handle404.css'
import {Link} from "react-router-dom";
import { Typography } from 'antd';

const { Title } = Typography;

function Handle404() {
    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <h1>
                <main className='container'>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>4</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <span className='particle'>0</span>
                    <article className='content'>
                        <p>Damnit stranger,</p>
                        <p>You got lost in the <strong>404</strong> galaxy.</p>
                        <p>
                            <button><Link to={'/'}>Go back home</Link></button>
                        </p>
                    </article>
                </main>
            </h1>
        </motion.div>
    )
}

export {Handle404}
