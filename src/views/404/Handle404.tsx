import React from "react";
import {motion} from "framer-motion";
import {routerVariant, solidColors} from "../shared/gobalVariables";
import './Handle404.css'
import {Link} from "react-router-dom";
import {Typography} from 'antd';

const {Text} = Typography;

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
                    <article className='content' >
                        <Text style={{color: solidColors.blue, fontSize: '1.2rem', fontWeight: 'bold'}}>throw new </Text>
                        <Text style={{color: 'rgb(78,201,176)', fontSize: '1.2rem', fontWeight: 'bold'}}>RouteNotFoundException(<Text style={{color: '#CE9178', fontSize: '1.2rem', fontWeight: 'bold'}}>'Don't change the URL your self'</Text>)</Text>
                        <br/>
                        <button><Link to={'/'}>Go back home</Link></button>
                    </article>
                </main>
            </h1>
        </motion.div>
    )
}

export {Handle404}
