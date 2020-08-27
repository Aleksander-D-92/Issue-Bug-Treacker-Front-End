import React, {CSSProperties} from "react";
import {Button, Card, Checkbox, Col, Divider, Form, Input, Row, Popover} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link, useHistory} from "react-router-dom";
import axios from 'axios'
import {Store} from "rc-field-form/lib/interface";
import {useDispatch} from 'react-redux';
import {deleteAllCookies} from "../../shared/functions";
import {UserDemoLogin} from "./UserDemoLogin";

function UserLogin() {
    let history = useHistory();
    const dispatch = useDispatch();

    function onFinish(loginForm: Store) {
        axios.post('/users/authenticate', loginForm)
            .then((e) => {
                updateCookiesAndStore(e.data.id_token)
                history.push('/')
            }).catch((e) => {
            console.log(e);
        })
    }

    function updateCookiesAndStore(token: string) {
        deleteAllCookies(); //delete all cookies
        document.cookie = `jwt=${token}`; //make a new cookie form the the new token
        //
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
        })

    }

    return (
        <Row justify={'center'} gutter={24} className='mt-5'>
            <Col xs={20} md={10}>
                <Divider orientation="center">Login</Divider>
                <Form
                    name="normal_login"
                    className="login-form"
                    layout={'vertical'}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{required: true, message: 'Please input your Username!'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
                            Log in
                        </Button>
                        Or <Link to={'/users/register'}>register now!</Link>
                    </Form.Item>
                </Form>
            </Col>
            <Col xs={20} md={10}>
                <UserDemoLogin/>
            </Col>
        </Row>
    )
}

export {UserLogin}
