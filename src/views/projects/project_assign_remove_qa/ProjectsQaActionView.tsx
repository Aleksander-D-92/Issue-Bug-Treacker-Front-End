import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Card, Col, Row, Typography} from "antd";
import {ProjectDetails} from "../../shared/Interfaces";
import {Link, useParams} from "react-router-dom";
import {capitalizeString} from "../../shared/functions";
import {LoadingNode} from "../../shared/GetLocale";

const {Title} = Typography;

const cardGridStyle = {width: '50%', textAlign: 'center'} as React.CSSProperties
const linkStyle = {fontSize: '1.1rem'} as React.CSSProperties

function ProjectsQaActionView() {
    const state = useSelector((state: ReduxState) => state);
    const managerId = state.userDetails.id;
    const {action} = useParams();
    const [projects, setProjects] = useState<ProjectDetails[]>();
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        axios.get(`/projects?action=own&id=${managerId}`).then((e) => {
            setProjects(e.data);
            setLoading(false);
        });
    }, [])
    return (
        <Row justify={'center'}>
            <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                <Card
                    title={
                        <Title
                            level={2}>{`${capitalizeString(action)} QA ${(action === 'assign') ? 'to' : 'from'} any project`}
                        </Title>
                    }
                    className={'mt-3'}>
                    {projects?.map((p) => {
                        return (
                            <Link to={`/projects/qa/${action}/${p.projectId}`} style={linkStyle}>
                                <Card.Grid style={cardGridStyle}>{p.title}</Card.Grid>
                            </Link>
                        )
                    })};
                    <LoadingNode message={`Please wait, until we fetch your projects...`} loading={loading}/>
                </Card>
            </Col>
        </Row>
    )
}


export {ProjectsQaActionView}
