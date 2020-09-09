import React, {useEffect, useState} from "react";
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {ProjectDetails, TicketDetails, UserDetails} from "../../shared/Interfaces";
import {capitalizeString} from "../../shared/functions";
import {Button, Card, Col, Form, Row, Select, Typography} from "antd";
import {ProjectInfo} from "../proect_details/ProjectInfo";

const {Option} = Select;


const {Title} = Typography;


function ProjectsQaEditView() {
    const {action} = useParams();
    const {projectId} = useParams();
    const history = useHistory();
    const state = useSelector((state: ReduxState) => state);
    const managerId = state.userDetails.id;

    const [qa, setQa] = useState<UserDetails[]>();
    const [qaLoading, setQaLoading] = useState<boolean>(true);

    const [project, setProject] = useState<ProjectDetails>();
    const [projectLoading, setProjectLoading] = useState<boolean>(true);

    const [tickets, setTickets] = useState<TicketDetails[]>();
    const [ticketsLoading, setTicketsLoading] = useState<boolean>(true);

    useEffect(() => {
        switch (action) {
            case 'assign':
                axios.get(`/projects/qa?action=available&managerId=${managerId}&projectId=${projectId}`).then((e) => {
                    setQa(e.data);
                    setQaLoading(false);
                });
                break;
            case 'remove':
                axios.get(`/projects/qa?action=assigned&projectId=${projectId}`).then((e) => {
                    setQa(e.data);
                    setQaLoading(false);
                })
                break;
        }
        axios.get(`/projects?action=single&id=${projectId}`).then((e) => {
            setProject(e.data[0]);
            setProjectLoading(false);
        });
        axios.get(`/tickets?action=by-project&id=${projectId}`).then((e) => {
            setTickets(e.data);
            setTicketsLoading(false);
        });

    }, [])

    function onFinish(e: any) {
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
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Card
                        title={
                            <Title
                                level={2}>{`${capitalizeString(action)} QA ${(action === 'assign') ? 'to' : 'from'} this project`}
                            </Title>
                        }
                        className={'mt-3'}>
                        <ProjectInfo project={project}
                                     totalQa={qa?.length}
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
                                    {qa?.map(qa => <Option value={qa.userId}>{qa.username}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Edit
                                </Button>
                            </Form.Item>
                            <Button block onClick={goBack}>
                                Go Back
                            </Button>
                        </Form>

                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {ProjectsQaEditView}
