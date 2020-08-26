import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Button, Card, Col, Form, Input, Row} from "antd";
import {UserViewModel} from "../../shered/Interfaces";
import {deleteAllCookies, formatDate} from "../../shered/functions";

function AccountSettings() {
    const reduxState = useSelector((state: ReduxState) => state)
    const [user, setUserDetails] = useState<UserViewModel>();
    const dispatch = useDispatch();
    let history = useHistory();
    useEffect(() => {
        axios.get(`/users/?action=single&id=${reduxState.userDetails.id}`, {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            setUserDetails(e.data[0]);
            console.log(e);
        })
    }, [])

    function changePassword(e: any) {
        axios.put(`/users/password/${reduxState.userDetails.id}`, {
            oldPassword: e.password,
            newPassword: e.newPassword
        }, {
            headers: {Authorization: reduxState.userDetails.authorizationHeader}
        }).then(e => {
            console.log(e);
        })
    }

    function deleteAccount(e: any) {
        console.log(e);
        axios.delete(`/users/account/${reduxState.userDetails.id}`, {
            headers: {Authorization: reduxState.userDetails.authorizationHeader},
            data: {password: e.password}
        }).then(e => {
            console.log(e);
            deleteAllCookies();
            dispatch({type: 'userLoggedOut'});
            history.push('/users/register');
        });
    }

    return (
        <React.Fragment>
            <Card title={user?.username} style={{width: 300}}>
                <p>Id {user?.id}</p>
                <p>Registration date {formatDate(user?.registrationDate)}</p>
                <p>Authority {user?.authority.authority}</p>
                <p>Authority level {user?.authority.authorityLevel}</p>
            </Card>
            <button type={'button'}>Delete account</button>
            <Row justify={'center'} className={'mt-5'}>
                <Col xs={24} md={12}>
                    Change password Form
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
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Change password
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

            {/*Delete account form*/}
            <Row justify={'center'} className={'mt-5'}>
                <Col xs={24} md={12}>
                    Change password Form
                    <Form
                        name="normal_login"
                        className="login-form"
                        layout={'vertical'}
                        onFinish={deleteAccount}
                    >
                        <Form.Item
                            label="Old password"
                            name="password"
                            validateTrigger={false}
                            rules={[{required: true, min: 4, max: 12, message: 'required: true, min: 4, max: 8'}]}
                        >
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Change password
                            </Button>
                        </Form.Item>
                    </Form>

                </Col>
            </Row>
        </React.Fragment>
    )
}

export {AccountSettings}
