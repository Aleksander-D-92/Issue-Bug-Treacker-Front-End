import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from "react-redux";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {User} from "../../user-roles/variables";
import {Button, Card, Col, Form, Input, Row} from "antd";
import {formatDate} from "../../projects/projectTables/TableVariables";

function AccountSettings() {
    const {username} = useParams();
    const reduxState = useSelector((state: ReduxState) => state)
    const [user, setUserDetails] = useState<User>();
    useEffect(() => {
        axios.get(`/users/get-user-details-by-username/${username}`, {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            setUserDetails(e.data);
            console.log(e);
        })
    }, [])

    function onFinish(e: any) {
        console.log(e);
        axios.put('/users/change-password', {
            username: username,
            password: e.password,
            newPassword: e.newPassword

        }, {
            headers: {Authorization: reduxState.userDetails.authorizationHeader}
        })
        console.log(e)
    }

    //@DeleteMapping("/users/delete")
    function handleDelete(e: any) {
        console.log(e);
        axios.delete('/users/delete-account', {
            headers: {Authorization: reduxState.userDetails.authorizationHeader},
            data: {username: username, password: e.password}
        })
    }

    return (
        <React.Fragment>
            <Card title={user?.username} style={{width: 300}}>
                <p>Id {user?.id}</p>
                <p>Registration date {formatDate(user?.registrationDate.toString().substring(0, 10))}</p>
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
                        onFinish={onFinish}
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
                        onFinish={handleDelete}
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
