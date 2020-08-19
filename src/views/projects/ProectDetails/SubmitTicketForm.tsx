import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Button, Checkbox, Col, Form, Input, Select} from "antd";

const {Option} = Select;

//todo
function SubmitTicketForm() {
    const state = useSelector(((state: ReduxState) => state));
    const {projectId} = useParams();
    const userId = state.userDetails.id;
    useEffect(() => {
        // axios.get('', {
        //     headers: {Authorization: state.userDetails.authorizationHeader}
        // }).then((e) => {
        //     console.log(e);
        // })
    }, [])

    function onFinish(data: any) {
        console.log(data);
    }

    return (
        <React.Fragment>
            <h1>Submit a ticket</h1>
            <Form
                name="basic"
                initialValues={{remember: true}}
                layout={'vertical'}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    validateTrigger={false}
                    rules={[{required: true, min: 5, max: 12, message: 'required: true, min: 5, max: 12'}]}
                >
                    <Input placeholder={'enter username'}/>
                </Form.Item>
                <Form.Item
                    label="Ticket Description"
                    name="description"
                    rules={[{required: true, min: 10, message: 'At least 10 chars long'}]}
                    validateTrigger={false}
                >
                    <Input.TextArea placeholder={'At least 10 chars long'}/>
                </Form.Item>
                <Form.Item name="category" label="Pick Category"
                           rules={[{required: true, message: 'please select your role'}]}>
                    <Select
                        placeholder="Select a ticket category"
                        allowClear
                    >
                        <Option value="BUGS_AND_ERRORS">Bugs And Errors</Option>
                        <Option value="FEATURE_REQUEST">Feature Request</Option>
                        <Option value="OTHER">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="priority" label="Chose a Priority"
                           rules={[{required: true, message: 'please select your role'}]}>
                    <Select
                        placeholder="Select a ticket priority"
                        allowClear
                    >
                        <Option value="LOW">Low</Option>
                        <Option value="MEDIUM">Medium</Option>
                        <Option value="HIGH">High</Option>
                        <Option value="URGENT">Urgent</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block danger>
                        All ready registered? Just sign in.
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export {SubmitTicketForm}
