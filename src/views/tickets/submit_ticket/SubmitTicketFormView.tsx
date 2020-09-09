import React from "react";
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios'
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Button, Card, Col, Form, Input, Row, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";

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
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
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
                                    max: 50,
                                    message: 'Title must be between 5 and 50 symbols long'
                                }]}
                            >
                                <Input type={'text'} placeholder={'Title must be between 5 and 50 symbols long'}/>
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                validateTrigger={false}
                                rules={[{
                                    required: true,
                                    min: 10,
                                    max: 255,
                                    message: 'Description must be between 10 and 255 symbols long'
                                }]}
                            >
                                <TextArea rows={4} placeholder={'Description must be between 10 and 255 symbols long'}/>
                            </Form.Item>

                            <Form.Item name="priority" label="Priority"
                                       rules={[{required: true, message: 'You must select a Priority'}]}>
                                <Select
                                    placeholder="Select a Priority"
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
                                    placeholder="Select a Category"
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
        </motion.div>
    )
}

export {SubmitTicketFormView}
