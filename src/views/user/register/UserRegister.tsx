import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
import {Button, Card, Col, Form, Input, Popover, Row, Select} from "antd";
import {Authority} from "../../shared/Interfaces";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {registerExplained} from "../login/variables";


const {Option} = Select;

function UserRegister() {
    const history = useHistory();
    const [form] = Form.useForm();
    const [authorities, setAuthorities] = useState<Authority[]>();
    const [isLoadingAuth, setLoadingAuth] = useState(true);
    const [isLoadingButton, setLoadingButton] = useState(false);

    useEffect(() => {
        axios.get(`/authorities/all`).then((e) => {
            setAuthorities(e.data);
            form.setFieldsValue({'authorityId': 3})
            setLoadingAuth(false)
        })
    }, [])

    function onFinish(registerForm: any) {
        setLoadingButton(true);
        axios.post('/users/register', registerForm).then((e) => {
            history.push('/users/login')
        }).catch((e) => {
            setLoadingButton(false)
        })
    }


    return (
        <Row justify={'center'} className={'mt-3'}>
            <Col xs={24} sm={23} md={23} lg={14}>
                <Card title="User registration form" extra={'Thank you for taking the time to register'}>
                    <Form
                        name="basic"
                        form={form}
                        onFinish={onFinish}
                        layout={'vertical'}
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
                            <Input placeholder={'Enter your username'}
                                   allowClear={true}
                                   type={'text'}
                                   prefix={<UserOutlined className="site-form-item-icon"/>}/>
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

                        <Form.Item
                            label="Confirm Password"
                            name="confirmPassword"
                            validateTrigger={false}
                            rules={[
                                {
                                    required: true,
                                    message: 'The two passwords do not match',
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
                            <Input.Password allowClear={true}
                                            placeholder={'Confirm your password'}
                                            prefix={<LockOutlined className="site-form-item-icon"/>}/>
                        </Form.Item>
                        <Popover placement="left" title={registerExplained}>
                            <Form.Item name="authorityId"
                                       label="This will be your authority"
                                       rules={[{required: true, message: 'please select your role'}]}>

                                <Select allowClear={true} loading={isLoadingAuth}>
                                    {authorities?.map(e => <Option disabled={e.authorityId !== 3}
                                                                   value={e.authorityId}>{e.authority}</Option>)}
                                </Select>
                            </Form.Item>
                        </Popover>
                        <Form.Item>
                            <Button type="primary"
                                    block={true}
                                    htmlType="submit"
                                    loading={isLoadingButton}>
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
