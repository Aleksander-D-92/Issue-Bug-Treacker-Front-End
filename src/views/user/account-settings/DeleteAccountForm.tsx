import React from "react";
import {Button, Form, Input} from "antd";
import axios from "axios";
import {deleteAllCookies} from "../../shared/functions";
import {useDispatch, useSelector} from "react-redux";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {useHistory} from "react-router-dom";

function DeleteAccountForm() {
    const reduxState = useSelector((state: ReduxState) => state)
    const dispatch = useDispatch();
    let history = useHistory();

    function deleteAccount(e: any) {
        console.log(e);
        axios.delete(`/users/account/${reduxState.userDetails.id}`, {
            headers: {Authorization: reduxState.userDetails.authorizationHeader},
            data: {password: e.password}
        }).then(e => {
            console.log(e);
            deleteAllCookies();
            dispatch({type: 'userLoggedOut'});
            dispatch({type: 'userDetails', payload: {}})
            history.push('/users/register');
        });
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
