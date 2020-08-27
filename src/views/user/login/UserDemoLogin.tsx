import React from "react";
import {Button, Card, Divider, Popover} from "antd";
import axios from 'axios'
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {deleteAllCookies} from "../../shared/functions";
import {
    adminDescription,
    demoAdminCredentials,
    demoDevCredentials,
    demoManagerCredentials,
    demoQaCredentials, devDescription,
    genericDescription, managerDescription,
    qaDescription
} from "./variables";


function UserDemoLogin() {
    const history = useHistory();
    const dispatch = useDispatch();

    function handleDemoLogin(e: React.MouseEvent<HTMLButtonElement>) {
        dispatch({type: 'userLoggedIn'});
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
                    authorities: jwtPayload.authorities,
                    exp: jwtPayload.exp,
                    authorizationHeader: `Bearer ${token}`
                }
            });
            history.push('/')
        })
    }

    return <React.Fragment>
        <Divider orientation="center"><h2>Demo login</h2></Divider>
        <Card title={<h2>Demo Login</h2>} extra={
            <Popover content={genericDescription} title="Explanation">
                <h2 style={{color: "#1890ff", cursor: 'pointer'}}>What is this ?</h2>
            </Popover>
        }>
            <Popover content={qaDescription} title="QA Engineer">
                <Button type="primary" htmlType="submit" className="login-form-button" block={true} name='qa'
                        onClick={handleDemoLogin}>
                    Demo QA Engineer
                </Button>
            </Popover>
            <Popover content={devDescription} title="Developer">
                <Button type="primary" htmlType="submit" className="login-form-button mt-2" block={true}
                        name='developer'
                        onClick={handleDemoLogin}>
                    Demo Developer
                </Button>
            </Popover>
            <Popover content={managerDescription} title="Project Manager">
                <Button type="primary" htmlType="submit" className="login-form-button mt-2" block={true}
                        name='projectManager' onClick={handleDemoLogin}>
                    Demo Project Manager
                </Button>
            </Popover>
            <Popover content={adminDescription} title="Admin">
                <Button type="primary" htmlType="submit" className="login-form-button mt-2" block={true} name='admin'
                        onClick={handleDemoLogin}>
                    Demo admin
                </Button>
            </Popover>
        </Card>
    </React.Fragment>;
}

export {UserDemoLogin}
