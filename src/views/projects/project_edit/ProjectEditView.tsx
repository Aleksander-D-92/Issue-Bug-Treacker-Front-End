import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useHistory, useParams} from 'react-router-dom';
import {Button, Card, Col, Form, Input, Row} from "antd";
import {ProjectDetails} from "../../shared/Interfaces";


function ProjectEditView() {
    const {projectId} = useParams();
    const [projectDetails, setProjectDetails] = useState<ProjectDetails>();
    const history = useHistory();
    const [updateProjectForm, setUpdateProjectForm] = useState<React.ReactNode>();
    useEffect(() => {
        axios.get(`/projects?action=single&id=${projectId}`).then((e) => {
            const project = e.data[0];
            setProjectDetails(e.data[0]);
            setUpdateProjectForm(
                <Form layout={'vertical'}
                      name={'projectEditForm'}
                      initialValues={{title: project.title, description: project.description}}
                      onFinish={editProject}>
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

        })
    }, [])

    function editProject(e: any) {
        const data = {title: e.title, description: e.description}
        axios.put(`/projects/${projectId}`, data).then((e) => {
            history.push("/projects/my")
        })
    }

    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Card title="Edit your project" className={'mt-3'}>
                        {updateProjectForm}
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {ProjectEditView}
