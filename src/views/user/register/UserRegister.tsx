import React from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import {Button, Checkbox, Col, Form, Input, Row, Select} from "antd";

const {Option} = Select;

function UserRegister() {
    let history = useHistory();

    function onFinish(e: any) {
        const data = {
            username: e.username,
            password: e.password,
            confirmPassword: e.confirmPassword,
            authority: e.authority
        }
        console.log(data);
        axios.post('/users/register', data).then((e) => {
            history.push('/users/login')
        }).catch((e) => {
            console.log(e);
        })

    }


    return (
        <Row justify={'center'}>
            <Col xs={24} md={12}>
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
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="ROLE_END_USER">End User</Option>
                            <Option value="ROLE_DEVELOPER">Developer</Option>
                            <Option value="ROLE_PROJECT_MANAGER">Project Manager</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block danger>
                            All ready registered? Just sign in.
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export {UserRegister}
