import React, {MouseEvent, useState} from "react";
import {Col, Row} from "antd";
import {DemoLogin} from "./DemoLogin";
import {LoginForm} from "./LoginForm";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Store} from "rc-field-form/lib/interface";
import axios from "axios";
import {deleteAllCookies} from "../../shared/functions";
import {demoAdminCredentials, demoDevCredentials, demoManagerCredentials, demoQaCredentials} from "./variables";

function LoginView() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState<boolean>(false);

    function onFinish(loginForm: Store) {
        setLoading(true)
        axios.post('/users/authenticate', loginForm)
            .then((e) => {
                updateCookiesAndStore(e.data.id_token)
                history.push('/dashboard');
                setLoading(false);
            }).catch(() => {
            setLoading(false);
        })
    }

    function updateCookiesAndStore(token: string) {
        deleteAllCookies(); //delete all cookies
        document.cookie = `jwt=${token}`; //make a new cookie form the the new token

        let jwtPayload = JSON.parse(atob(token.split('.')[1])); //parse the JWT payload to JSON object
        dispatch({type: 'userLoggedIn'});
        dispatch({
            type: 'userDetails', payload: {
                id: jwtPayload.id,
                username: jwtPayload.sub,
                authority: jwtPayload.authorities,
                exp: jwtPayload.exp,
                authorizationHeader: `Bearer ${token}`
            }
        })
    }

    function handleDemoLogin(e: MouseEvent<HTMLButtonElement>) {
        setLoading(true)
        let name = e.currentTarget.name;
        let credentials = {};
        switch (name) {
            case 'qa':
                credentials = demoQaCredentials;
                break;
            case 'developer':
                credentials = demoDevCredentials;
                break;
            case 'projectManager':
                credentials = demoManagerCredentials;
                break;
            case 'admin':
                credentials = demoAdminCredentials;
                break;
        }
        axios.post('/users/authenticate/', credentials).then((e) => {
            deleteAllCookies();
            const token = e.data.id_token;
            document.cookie = `jwt=${token}`;
            let jwtPayload = JSON.parse(atob(token.split('.')[1])); //parse the JWT payload to JSON object
            dispatch({type: 'userLoggedIn'});
            dispatch({
                type: 'userDetails', payload: {
                    id: jwtPayload.id,
                    username: jwtPayload.sub,
                    authority: jwtPayload.authorities,
                    exp: jwtPayload.exp,
                    authorizationHeader: `Bearer ${token}`
                }
            });
            history.push('/dashboard')
        }).catch(() => {
            setLoading(false)
        })
    }

    return (
        <Row justify={'center'} gutter={[24, 24]} className='mt-3'>
            <Col xs={24} sm={23} md={23} lg={11}>
                <DemoLogin handleDemoLogin={handleDemoLogin}
                           isLoading={isLoading}/>
            </Col>
            <Col xs={24} sm={23} md={23} lg={11}>
                <LoginForm onFinish={onFinish}
                           isLoading={isLoading}/>
            </Col>
        </Row>
    )
}

export {LoginView}
