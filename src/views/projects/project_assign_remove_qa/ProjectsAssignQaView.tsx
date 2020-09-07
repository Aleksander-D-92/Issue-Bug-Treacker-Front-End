import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Card, Col, Row, Typography} from "antd";
import {ProjectDetails} from "../../shared/Interfaces";
import {Link, useParams} from "react-router-dom";
import {capitalizeString} from "../../shared/functions";

const {Title} = Typography;

const cardGridStyle = {width: '50%', textAlign: 'center'} as React.CSSProperties
const linkStyle = {fontSize: '1.1rem'} as React.CSSProperties

function ProjectsAssignQaView() {
    const state = useSelector((state: ReduxState) => state);
    const managerId = state.userDetails.id;
    const {action} = useParams();
    const [projects, setProjects] = useState<ProjectDetails[]>();
    useEffect(() => {
        axios.get(`/projects?action=own&id=${managerId}`).then((e) => {
            setProjects(e.data);
        });
    }, [])
    return (
        <Row justify={'center'}>
            <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                <Card
                    title={
                        <Title
                            level={2}>{`${capitalizeString(action)} QA ${(action === 'assign') ? 'to' : 'from'} project`}
                        </Title>
                    }
                    className={'mt-3'}>
                    {projects?.map((p) => {
                        return (
                            <Link to={`/project/qa/${action}/${p.projectId}`} style={linkStyle}>
                                <Card.Grid style={cardGridStyle}>{p.title}</Card.Grid>
                            </Link>
                        )
                    })};
                </Card>
            </Col>
        </Row>
    )
}


export {ProjectsAssignQaView}
