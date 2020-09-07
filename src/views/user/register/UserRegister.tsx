import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
import {Button, Card, Col, Form, Input, Row, Select} from "antd";
import {Authority} from "../../shared/Interfaces";
import {UserOutlined, LockOutlined} from '@ant-design/icons';


const {Option} = Select;

function UserRegister() {
    let history = useHistory();
    const [authorities, setAuthorities] = useState<Authority[]>();
    useEffect(() => {
        axios.get(`/authorities/all`).then((e) => {
            setAuthorities(e.data);
        })
    }, [])

    function onFinish(registerForm: any) {
        axios.post('/users/register', registerForm).then((e) => {
            history.push('/users/login')
        }).catch((e) => {
            console.log(e);
        })
    }


    return (
        <Row justify={'center'} className={'mt-3'}>
            <Col xs={24} sm={23} md={23} lg={14}>
                <Card title="User registration form" extra={'Thank you for taking the time to register'}>
                    <Form
                        name="basic"
                        initialValues={{'authorityId': 3}}
                        onFinish={onFinish}
                        layout={'vertical'}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            validateTrigger={false}
                            rules={[{
                                required: true,
                                pattern: new RegExp('^[a-zA-Z0-9]{5,20}$'),
                                message: 'Must be between 5 and 20 chars, can only include numbers and chars'
                            }]}>
                            <Input placeholder={'enter username'} allowClear={true} type={'text'}
                                   prefix={<UserOutlined className="site-form-item-icon"/>}/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            validateTrigger={false}
                            rules={[{
                                required: true,
                                pattern: new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
                                message: 'Minimum six characters, at least one letter and one number'
                            }]}
                        >
                            <Input type={'password'} placeholder={'enter your password'} allowClear={true}
                                   prefix={<LockOutlined className="site-form-item-icon"/>}/>
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
                            <Input type={'password'} placeholder={'confirm your password'} allowClear={true}
                                   prefix={<LockOutlined className="site-form-item-icon"/>}/>
                        </Form.Item>
                        <Form.Item name="authorityId"
                                   label="This will be your authority"
                                   rules={[{required: true, message: 'please select your role'}]}>
                            <Select allowClear={true}>
                                {authorities?.map(e => <Option disabled={e.authorityId !== 3}
                                                               value={e.authorityId}>{e.authority}</Option>)}
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
