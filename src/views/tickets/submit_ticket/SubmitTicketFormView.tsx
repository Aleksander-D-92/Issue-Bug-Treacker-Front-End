import React, {useEffect, useState} from "react";
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Button, Card, Col, Form, Input, Row, Select} from "antd";

const {Option} = Select;


function SubmitTicketFormView() {
    const state = useSelector((state: ReduxState) => state)
    const submitterId = state.userDetails.id;
    const {projectId} = useParams();
    const history = useHistory();

    function onFinish(e: any) {
        const data = {
            title: e.title,
            description: e.description,
            priority: e.priority,
            category: e.category,
            submitterId: submitterId
        };
        axios.post(`/tickets/${projectId}`, data, {}).then((e) => {
            history.push(`/`);
        })
    }

    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Card title="Ticket Submit form" className={'mt-3'}>
                        <Form layout={'vertical'}
                              name={'ticketSubmit'}
                              onFinish={onFinish}>
                            <Form.Item
                                label="Title"
                                name="title"
                                validateTrigger={false}
                                rules={[{
                                    required: true,
                                    min: 5,
                                    max: 30,
                                    message: 'Must be between 5 and 30 symbols'
                                }]}
                            >
                                <Input type={'text'} placeholder={'Title must be between 5 and 30 symbols'}/>
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                validateTrigger={false}
                                rules={[{
                                    required: true,
                                    min: 10,
                                    max: 255,
                                    message: 'Description must be between 10 and 255 symbols'
                                }]}
                            >
                                <Input type={'text'} placeholder={'must be between 10 and 255 symbols'}/>
                            </Form.Item>

                            <Form.Item name="priority" label="Priority"
                                       rules={[{required: true, message: 'You must select a Priority'}]}>
                                <Select
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                >
                                    <Option value="LOW">Low</Option>
                                    <Option value="MEDIUM">Medium</Option>
                                    <Option value="HIGH">High</Option>
                                    <Option value="URGENT">Urgent</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item name="category" label="Category"
                                       rules={[{required: true, message: 'You must select a Category'}]}>
                                <Select
                                    placeholder="Select a option and change input text above"
                                    allowClear
                                >
                                    <Option value="BUGS_AND_ERRORS">Bugs and Errors</Option>
                                    <Option value="FEATURE_REQUEST">Feature Request</Option>
                                    <Option value="OTHER">Other</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Submit new ticket
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {SubmitTicketFormView}
