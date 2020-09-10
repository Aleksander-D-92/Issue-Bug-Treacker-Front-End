import React from "react";
import {Button, Form, Input} from "antd";
import {LockOutlined} from '@ant-design/icons';


interface Props {
    changePassword: Function
}

function ChangePasswordForm(props: Props) {


    return (
        <React.Fragment>
            <Form
                name="changePassword"
                className="login-form"
                layout={'vertical'}
                onFinish={(e) => props.changePassword(e)}
            >
                <Form.Item
                    label="Old password"
                    name="password"
                    validateTrigger={false}
                    rules={[{
                        required: true,
                        pattern: new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
                        message: 'Password must be at least six characters, include at least one letter and at least one number'
                    }]}
                >
                    <Input.Password allowClear={true}
                                    placeholder={'Enter your old password'}
                                    prefix={<LockOutlined className="site-form-item-icon"/>}/>
                </Form.Item>
                <Form.Item
                    label="New password"
                    name="newPassword"
                    validateTrigger={false}
                    rules={[{
                        required: true,
                        pattern: new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
                        message: 'The new password must be at least six characters, include at least one letter and at least one number'
                    }]}
                >
                    <Input.Password allowClear={true}
                                    placeholder={'Enter your new password'}
                                    prefix={<LockOutlined className="site-form-item-icon"/>}/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className="login-form-button" block={true} danger={true}>
                        Change password
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export {ChangePasswordForm}
