import React from "react";
import axios from 'axios';
import {UserOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {Button, Col, Form, Input, Row} from "antd";


function CreateProjectView() {
    const state = useSelector((state: ReduxState) => state);

    function onFinish(projectForm: any) {
        const userId = state.userDetails.id;
        console.log(projectForm);
        const data = {userId: userId, title: projectForm.title, description: projectForm.description}
        axios.post('/projects/create-project', data, {
            headers: {
                Authorization: state.userDetails.authorizationHeader
            }
        }).then((e) => {

        })
    }


    return (
        <React.Fragment>
            <Row justify={'center'} className={'mt-5'}>
                <Col xs={24} md={12}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        layout={'vertical'}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Project Title"
                            name="title"
                            rules={[{required: true, min: 5, message: 'At least 5 chars length'}]}
                            validateTrigger={false}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                   placeholder="At least 5 chars long"/>
                        </Form.Item>
                        <Form.Item
                            label="Project Description"
                            name="description"
                            rules={[{required: true, min: 10, message: 'At least 10 chars long'}]}
                            validateTrigger={false}
                        >
                            <Input.TextArea placeholder={'At least 10 chars long'}/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" block={true}>
                                Create new project
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {CreateProjectView}
