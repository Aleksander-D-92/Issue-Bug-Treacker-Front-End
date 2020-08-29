import React from "react";
import {Button, Form, Input} from "antd";
import axios from "axios";
import {useHistory} from "react-router-dom";

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
                name="normal_login"
                className="login-form"
                layout={'vertical'}
                onFinish={deleteAccount}
            >
                <Form.Item
                    label="Password"
                    name="password"
                    validateTrigger={false}
                    rules={[{required: true, min: 4, max: 12, message: 'required: true, min: 4, max: 8'}]}
                >
                    <Input.Password/>
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
