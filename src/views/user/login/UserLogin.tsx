import React from "react";
import {Button, Checkbox, Col, Form, Input, Row} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import axios from 'axios'
import {Store} from "rc-field-form/lib/interface";
import {useDispatch} from 'react-redux';

function UserLogin() {
    let history = useHistory();
    const dispatch = useDispatch();

    function onFinish(e: Store) {
        const data = {
            username: e.username,
            password: e.password,
            rememberMe: e.rememberMe,
        }
        axios.post('/users/authenticate', data).then((e) => {
            dispatch({type: 'userLoggedIn'});
            updateCookiesAndStore(e.data.id_token)
            history.push('/')
        }).catch((e) => {
            console.log(e);
        })
    }

    function updateCookiesAndStore(token: string) {
        //delete all cookies
        let cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        document.cookie = `jwt=${token}`;
        //we take the JWT split it to take the payload then we turn it from base 64 to normal then to JSON
        let jwtPayload = JSON.parse(atob(token.split('.')[1]));
        // console.log(jwtPayload); //{sub: "pesho", authorities: "ROLE_USER", exp: 1597390109}
        dispatch({
            type: 'userDetails', payload: {
                username: jwtPayload.sub,
                authorities: jwtPayload.authorities,
                exp: jwtPayload.exp,
                authorizationHeader: `Bearer ${token}`
            }
        })

    }

    return (
        <Row justify={'center'} className={'mt-5'}>
            <Col xs={24} md={12}>
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
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to={'/users/register'}>register now!</Link>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export {UserLogin}
