import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
import {Button, Card, Col, Form, Input, Row, Typography} from "antd";
import {ReduxState} from "../../../configuration/redux/reduxStrore";

const {Title} = Typography;

function NewProjectView() {
    const state = useSelector((state: ReduxState) => state);

    function submitProject() {
        axios.post(``).then((e) => {

        })
    }

    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Card>
                        <Form layout={'vertical'}
                              name={'projectEditForm'}
                              initialValues={{}}
                              onFinish={submitProject}>
                            <Form.Item
                                label="Title"
                                name="title"
                                validateTrigger={false}
                                rules={[{
                                    required: true,
                                    min: 5,
                                    max: 30,
                                    message: 'Must be between 5 and 30 symbols',

                                }]}
                            >
                                <Input type={'text'} allowClear={true}/>
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                validateTrigger={false}
                                rules={[{
                                    required: true,
                                    min: 10,
                                    max: 225,
                                    message: 'Description be between 10 and 225 symbols',

                                }]}
                            >
                                <Input type={'text'} allowClear={true}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" danger={true} htmlType="submit" block>
                                    Edit project
                                </Button>
                            </Form.Item>
                        </Form>
                        )
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {NewProjectView}
