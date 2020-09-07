import React from "react";
import {useHistory} from 'react-router-dom';
import {Button, Form, Input} from "antd";
import axios from "axios";
import {LockOutlined} from '@ant-design/icons';


interface Props {
    userId: number
}

function ChangePasswordForm(props: Props) {
    const history = useHistory();

    function changePassword(e: any) {
        axios.put(`/users/password/${props.userId}`, {
            oldPassword: e.password,
            newPassword: e.newPassword
        }).then((e) => {
            history.push("/users/logout")
        })
    }

    return (
        <React.Fragment>
            <Form
                name="changePassword"
                className="login-form"
                layout={'vertical'}
                onFinish={changePassword}
            >
                <Form.Item
                    label="Old password"
                    name="password"
                    validateTrigger={false}
                    rules={[{
                        required: true,
                        pattern: new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$'),
                        message: 'Minimum six characters, at least one letter and one number'
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
                        message: 'Minimum six characters, at least one letter and one number'
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
