import React from "react";
import {Button, Form, Input} from "antd";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {LockOutlined} from '@ant-design/icons';


interface Props {
    userId: number
}

function DeleteAccountForm(props: Props) {
    let history = useHistory();

    function deleteAccount(form: any) {
        console.log(form);
        axios.put(`/users/account-lock/${props.userId}`, {
            password: form.password
        }).then(e => {
            console.log(e);
            history.push("/users/logout");
        })
    }

    return (
        <React.Fragment>
            <Form
                name="deleteAccount"
                className="login-form"
                layout={'vertical'}
                onFinish={deleteAccount}
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
