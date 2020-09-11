import React from "react";
import {Authority} from "../../shared/Interfaces";
import {FormInstance} from "antd/es/form";
import {Button, Card, Form, Input, Popover, Select} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {registerExplained} from "../login/variables";
import {Link} from "react-router-dom";
const {Option} = Select;

interface Props {
    form: FormInstance
    onFinish: Function
    authorities?: Authority[]
    buttonLoading: boolean
}

function RegisterForm(props: Props) {
    return (
        <Card title={<h2>Register</h2>} extra={'Thank you for taking the time to register'}>
            <Form
                name="basic"
                form={props.form}
                onFinish={(e) => props.onFinish(e)}
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

                        <Select allowClear={true} loading={props.authorities === undefined}>
                            {props.authorities?.map(e => <Option disabled={e.authorityId !== 3} value={e.authorityId}>{e.authority}</Option>)}
                        </Select>
                    </Form.Item>
                </Popover>
                <Form.Item>
                    <Button type="primary"
                            block={true}
                            htmlType="submit"
                            loading={props.buttonLoading}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
            <Button htmlType="submit" block>
                <Link to={'/users/login'}>All ready Registered? Just log in.</Link>
            </Button>
        </Card>
    )
}

export {RegisterForm}
