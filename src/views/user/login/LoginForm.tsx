import React, {useState} from "react";
import {Button, Card, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link, useHistory} from "react-router-dom";
import axios from 'axios'
import {Store} from "rc-field-form/lib/interface";
import {useDispatch} from 'react-redux';
import {deleteAllCookies} from "../../shared/functions";

function LoginForm() {
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
        //
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

    return (
        <React.Fragment>
            <Card title={<h2>Login</h2>}>
                <Form
                    name="normal_login"
                    className="login-form"
                    layout={'vertical'}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        validateTrigger={false}
                        rules={[{
                            required: true,
                            pattern: new RegExp('^[a-zA-Z0-9_]{5,20}$'),
                            message: 'Username must be between 5 and 20 chars, can only include letters, numbers and "_"'
                        }]}>
                        <Input allowClear={true} prefix={<UserOutlined className="site-form-item-icon"/>}
                               placeholder="Enter your username"/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        validateTrigger={false}
                        rules={[{
                            required: true,
                            pattern: new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
                            message: 'Password must be at least six characters, include at least one letter and at least one number'
                        }]}
                    >
                        <Input.Password allowClear={true}
                                        placeholder={'Enter your password'}
                                        prefix={<LockOutlined className="site-form-item-icon"/>}/>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={isLoading}
                                block={true}>
                            Log in
                        </Button>
                        Or <Link to={'/users/register'}>register now!</Link>
                    </Form.Item>
                </Form>
            </Card></React.Fragment>
    )
}

export {LoginForm}
