import React from "react";
import {Authority} from "../../shared/Interfaces";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Form, Input, Select} from "antd";
import {FormInstance} from "antd/es/form";
import {ManagerCardHeader} from "./ManagerCardHeader";

const {Option} = Select;

interface Props {
    authorities?: Authority[]
    onFinish: Function,
    form: FormInstance,
    loadingAuthorities: boolean,
    buttonLoading: boolean
}

function ManagerCreateAcc(props: Props) {
    return (
        <React.Fragment>
            <Card title={<ManagerCardHeader/>} className={'mt-3'}>
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
                        <Input placeholder={'Enter the username of the account'}
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
                                        placeholder={'Enter a password'}
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
                                        placeholder={'Confirm that password'}
                                        prefix={<LockOutlined className="site-form-item-icon"/>}/>
                    </Form.Item>
                    <Form.Item name="authorityId"
                               label="Chose if you want to create a QA account or a Developer account"
                               rules={[{required: true, message: 'Please select the accounts authority'}]}>

                        <Select allowClear={true}
                                loading={props.loadingAuthorities}>
                            {props.authorities?.map(e =>
                                (e.authorityId === 1 || e.authorityId === 2) ?
                                    <Option value={e.authorityId}>{e.authority}</Option> : ''
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={props.buttonLoading}>
                            Register new employee
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </React.Fragment>
    )
}

export {ManagerCreateAcc}
