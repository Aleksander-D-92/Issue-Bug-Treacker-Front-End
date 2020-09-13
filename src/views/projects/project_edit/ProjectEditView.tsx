import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useHistory, useParams} from 'react-router-dom';
import {Button, Card, Col, Form, Input, Row} from "antd";
import {ProjectDetails} from "../../shared/Interfaces";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";

const {TextArea} = Input;


function ProjectEditView() {
    const {projectId} = useParams();
    const history = useHistory();
    const [project, setProject] = useState<ProjectDetails>();
    const [form] = Form.useForm();
    useEffect(() => {
        axios.get(`/projects?action=single&id=${projectId}`).then((e) => {
            setProject(e.data[0]);
        })
    }, [projectId])

    useEffect(() => {
        form.setFieldsValue({'title': project?.title, 'description': project?.description})
    }, [form, project])

    function editProject(e: any) {
        const data = {title: e.title, description: e.description}
        axios.put(`/projects/${projectId}`, data).then((e) => {
            history.push("/projects/my")
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
                    <Card title="Edit your project" className={'mt-3'}>
                        <Form layout={'vertical'}
                              name={'projectEditForm'}
                              form={form}
                              onFinish={editProject}>
                            <Form.Item
                                label="Title"
                                name="title"
                                validateTrigger={false}
                                rules={[{
                                    required: true,
                                    min: 5,
                                    max: 50,
                                    message: 'Title must be between 10 and 50 symbols long',

                                }]}
                            >
                                <Input type={'text'}
                                       allowClear={true}
                                       placeholder={'Title must be between 10 and 50 symbols long'}/>
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                validateTrigger={false}
                                rules={[{
                                    required: true,
                                    min: 10,
                                    max: 225,
                                    message: 'Description must be between 10 and 255 symbols long',

                                }]}
                            >
                                <TextArea rows={4}
                                          allowClear={true}
                                          placeholder={'Description must be between 10 and 255 symbols long'}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" danger={true} htmlType="submit" block>
                                    Edit project
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </motion.div>
    )
}

export {ProjectEditView}
