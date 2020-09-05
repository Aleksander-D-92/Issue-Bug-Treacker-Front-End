import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector} from 'react-redux';
import {Col, Row, Typography} from "antd";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {ProjectsList} from "../projects_list/ProjectsList";
import {ProjectDetails} from "../../shared/Interfaces";

const {Title} = Typography;

function MyProjectsView() {
    const state = useSelector((state: ReduxState) => state)
    const [projects, setProjects] = useState<ProjectDetails[]>();
    useEffect(() => {
        axios.get(`/projects?action=own&id=${state.userDetails.id}`).then((e) => {
            setProjects(e.data);
        })
    }, [])
    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Title level={2} className={'mt-2'}>You can edit them, submit
                        tickets for any projects or view their details</Title>
                    <ProjectsList authority={state.userDetails.authority} projects={projects}/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {MyProjectsView}
