import React from "react";
import {useHistory} from 'react-router-dom';
import {Button, Form, Input} from "antd";
import axios from "axios";

interface Props {
    userId: number
}

function ChangePasswordForm(props: Props) {
    const history = useHistory();

    function changePassword(e: any) {
        axios.put(`/users/password/${props.userId}`, {
            oldPassword: e.password,
            newPassword: e.newPassword
        }).then(e => {
            console.log(e);
            history.push("/users/logout")
        }).catch((e) => {
            console.log(e);
        })
    }

    return (
        <React.Fragment>
            <Form
                name="normal_login"
                className="login-form"
                layout={'vertical'}
                onFinish={changePassword}
            >
                <Form.Item
                    label="Old password"
                    name="password"
                    validateTrigger={false}
                    rules={[{required: true, min: 4, max: 12, message: 'required: true, min: 4, max: 8'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    label="New password"
                    name="newPassword"
                    validateTrigger={false}
                    rules={[{required: true, min: 4, max: 12, message: 'required: true, min: 4, max: 8'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" className="login-form-button" block={true} danger={true}>
                        Change password
                    </Button>
                </Form.Item>
            </Form></React.Fragment>
    )
}

export {ChangePasswordForm}
