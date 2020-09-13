import React, {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {ProjectDetails, TicketDetails, UserDetails} from "../../shared/Interfaces";
import {capitalizeString} from "../../shared/functions";
import {Button, Card, Col, Form, Row, Select, Typography} from "antd";
import {ProjectInfo} from "../proect_details/ProjectInfo";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";

const {Option} = Select;


const {Title} = Typography;


function ProjectsQaEditView() {
    const {action} = useParams();
    const {projectId} = useParams();
    const history = useHistory();
    const state = useSelector((state: ReduxState) => state);
    const managerId = state.userDetails.id;
    const [btnLoading, setBtnLoading] = useState<boolean>(false);

    const [availableQa, setAvailableQa] = useState<UserDetails[]>();
    const [availableQaLoading, setAvailableQaLoading] = useState<boolean>(true);

    const [assignedQa, setAssignedQa] = useState<UserDetails[]>();

    const [project, setProject] = useState<ProjectDetails>();

    const [tickets, setTickets] = useState<TicketDetails[]>();

    useEffect(() => {
        if (action !== 'assign' && action !== 'remove') {
            history.goBack();
        }
        axios.get(`/projects/qa?action=available&managerId=${managerId}&projectId=${projectId}`).then((e) => {
            setAvailableQa(e.data);
            setAvailableQaLoading(false);
        });

        axios.get(`/projects/qa?action=assigned&projectId=${projectId}`).then((e) => {
            setAssignedQa(e.data);
        });
        axios.get(`/projects?action=single&id=${projectId}`).then((e) => {
            setProject(e.data[0]);
        });
        axios.get(`/tickets?action=by-project&id=${projectId}`).then((e) => {
            setTickets(e.data);
        });

    }, [action, history, managerId, projectId])

    function onFinish(e: any) {
        setBtnLoading(true);
        const data = {
            qaIds: e.selectedUsers
        }
        switch (action) {
            case 'assign':
                axios.put(`/projects/qa?action=add&projectId=${projectId}`, data).then(() => {
                    history.goBack();
                })
                break;
            case 'remove':
                axios.put(`/projects/qa?action=remove&projectId=${projectId}`, data).then(() => {
                    history.goBack();
                })
                break;
        }
    }

    function goBack() {
        history.goBack();
    }

    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={14}>
                    <Card
                        title={
                            <Title
                                level={2}>{`${capitalizeString(action)} QA ${(action === 'assign') ? 'to' : 'from'} this project`}
                            </Title>
                        }
                        className={'mt-3'}>
                        <ProjectInfo project={project}
                                     totalQa={assignedQa?.length}
                                     totalTickets={tickets?.length}/>

                        <Form
                            name="basic"
                            onFinish={onFinish}
                            layout={'vertical'}>
                            <Form.Item
                                label="Select users"
                                name="selectedUsers"
                                validateTrigger={false}
                                rules={[{
                                    required: true,
                                    message: 'Must pick at least one if you want to submit, else just click Go Back'
                                }]}>
                                <Select allowClear={true} mode="tags" tokenSeparators={[',']}>
                                    {action === 'remove' ?
                                        assignedQa?.map(qa => <Option value={qa.userId}>{qa.username}</Option>)
                                        :
                                        availableQa?.map(qa => <Option value={qa.userId}>{qa.username}</Option>)
                                    }

                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    block
                                    loading={btnLoading && availableQaLoading}>
                                    {action === 'assign' ? 'Assign QA' : 'Remove QA'}
                                </Button>
                            </Form.Item>
                            <Button block
                                    onClick={goBack}
                                    loading={btnLoading}>
                                Go Back
                            </Button>
                        </Form>

                    </Card>
                </Col>
            </Row>
        </motion.div>
    )
}

export {ProjectsQaEditView}
