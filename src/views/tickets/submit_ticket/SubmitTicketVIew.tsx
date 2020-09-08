import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {ProjectDetails} from "../../shared/Interfaces";
import {Col, Row, Typography} from "antd";
import {ProjectsList} from "../../projects/projects_list/ProjectsList";

function SubmitTicketVIew() {
    const state = useSelector((state: ReduxState) => state);
    const id = state.userDetails.id;
    const [projects, setProjects] = useState<ProjectDetails[]>();
    useEffect(() => {
        switch (state.userDetails.authority) {
            case 'ROLE_PROJECT_MANAGER':
                axios.get(`/projects?action=own&id=${id}`).then((e) => {
                    setProjects(e.data);
                })
                break;
            case 'ROLE_DEVELOPER':
                axios.get(`/projects?action=include-developer&id=${id}`).then((e) => {
                    setProjects(e.data);
                });
                break
            case 'ROLE_QA':
                axios.get(`/projects?action=include-qa&id=${id}`).then((e) => {
                    setProjects(e.data);
                });
                break;
            case 'ROLE_ADMIN':
                axios.get(`/projects?action=all`).then((e) => {
                    setProjects(e.data);
                });
                break;
        }
    }, [])
    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Typography.Title level={2}>
                        Click on the Submit button for any of the projects to submit a ticket
                    </Typography.Title>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <ProjectsList projects={projects} authority={state.userDetails.authority} projectsLoading={true}/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {SubmitTicketVIew}
