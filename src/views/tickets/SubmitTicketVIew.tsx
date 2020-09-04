import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector} from 'react-redux';
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {ProjectDetails} from "../shared/Interfaces";
import {Col, Row} from "antd";
import {DashBoardProjects} from "../dashboard/DashBoardProjects";

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
            <Row>
                <Col>
                    <DashBoardProjects projects={projects}/>
                </Col>
            </Row>
            <Row>
                <Col>

                </Col>
            </Row>
        </React.Fragment>
    )
}

export {SubmitTicketVIew}
