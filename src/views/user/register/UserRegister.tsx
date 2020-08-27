import React from "react";
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
import {Button, Card, Col, Form, Input, Row, Select} from "antd";

const {Option} = Select;

function UserRegister() {
    let history = useHistory();

    function onFinish(registerForm: any) {
        axios.post('/users/register', registerForm).then((e) => {
            history.push('/users/login')
        }).catch((e) => {
            console.log(e);
        })
    }


    return (
        <Row justify={'center'} className={'mt-3'}>
            <Col xs={24} sm={22} md={18}>
                <Card title="User registration form" extra={'Thank you for taking the time to register'}>
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        layout={'vertical'}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            validateTrigger={false}
                            rules={[{required: true, min: 5, max: 12, message: 'required: true, min: 5, max: 12'}]}
                        >
                            <Input placeholder={'enter username'}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            validateTrigger={false}
                            rules={[{required: true, min: 4, max: 12, message: 'required: true, min: 4, max: 8'}]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            validateTrigger={false}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({getFieldValue}) => ({
                                    validator(rule, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords that you entered do not match!');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item name="authority" label="Your Role"
                                   rules={[{required: true, message: 'please select your role'}]}>
                            <Select
                                placeholder="Select a option and change input text above" allowClear
                                defaultValue={'ROLE_PROJECT_MANAGER'}>
                                <Option value="ROLE_QA_ENGINEER" disabled={true}>End User</Option>
                                <Option value="ROLE_DEVELOPER" disabled={true}>Developer</Option>
                                <Option value="ROLE_PROJECT_MANAGER">Project Manager</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button htmlType="submit" block>
                        <Link to={'/users/login'}>All ready Registered? Just log in.</Link>
                    </Button>
                </Card>
            </Col>
        </Row>
    )
}

export {UserRegister}
