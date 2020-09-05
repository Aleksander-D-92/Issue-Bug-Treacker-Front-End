import React from "react";
import {useSelector} from 'react-redux';
import axios from 'axios'
import {Button, Card, Col, Form, Input, Row} from "antd";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {useHistory} from 'react-router-dom';


function NewProjectView() {
    const state = useSelector((state: ReduxState) => state);
    const history = useHistory();

    function submitProject(e: any) {
        const data = {
            title: e.title,
            description: e.description
        }
        axios.post(`/projects/${state.userDetails.id}`, data).then((e) => {
            history.push(`/projects/my`);
        })
    }

    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Card title={'Submit a new project'} className={'mt-3'}>
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
                                <Button type="primary" htmlType="submit" block>
                                    Create new project
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {NewProjectView}
