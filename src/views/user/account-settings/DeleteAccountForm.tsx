import React from "react";
import {Button, Form, Input} from "antd";
import {LockOutlined} from '@ant-design/icons';


interface Props {
    deleteAccount: Function
}

function DeleteAccountForm(props: Props) {
    return (
        <React.Fragment>
            <Form
                name="deleteAccount"
                className="login-form"
                layout={'vertical'}
                onFinish={(e) => props.deleteAccount(e)}
            >
                <Form.Item
                    label="Password"
                    name="password"
                    validateTrigger={false}
                    rules={[{
                        required: true,
                        pattern: new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
                        message: 'Password must be at least six characters, include at least one letter and at least one number'
                    }]}>
                    <Input.Password allowClear={true}
                                    placeholder={'Enter your  password'}
                                    prefix={<LockOutlined className="site-form-item-icon"/>}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" block={true} danger={true}>
                        Delete Account
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export {DeleteAccountForm}
