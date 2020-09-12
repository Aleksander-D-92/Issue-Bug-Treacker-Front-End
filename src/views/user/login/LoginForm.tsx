import React from "react";
import {Button, Card, Checkbox, Form, Input} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

interface Props {
    onFinish: Function,
    isLoading: boolean
}

function LoginForm(props: Props) {
    return (
        <React.Fragment>
            <Card title={<h2>Login</h2>}>
                <Form
                    name="normal_login"
                    className="login-form"
                    layout={'vertical'}
                    onFinish={(e) => props.onFinish(e)}
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
                    <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary"
                                htmlType="submit"
                                className={'mt-2'}
                                loading={props.isLoading}
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
