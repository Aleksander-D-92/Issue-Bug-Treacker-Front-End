import React, {useEffect, useState} from "react";
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {ProjectDetails, UserDetails} from "../../shared/Interfaces";
import {capitalizeString} from "../../shared/functions";
import {Card, Col, Row, Typography} from "antd";

const {Title} = Typography;


function ProjectsQaEditView() {
    const {action} = useParams();
    const {projectId} = useParams();
    const state = useSelector((state: ReduxState) => state);
    const managerId = state.userDetails.id;
    const [qa, setQa] = useState<UserDetails[]>();
    const [project, setProject] = useState<ProjectDetails>();
    useEffect(() => {
        switch (action) {
            case 'assign':
                axios.get(`/projects/qa?action=available&managerId=${managerId}&projectId=${projectId}`).then((e) => {
                    setQa(e.data);
                });
                break;
            case 'remove':
                axios.get(`/projects/qa?action=assigned&projectId=${projectId}`).then((e) => {
                    setQa(e.data);
                })
                break;
        }
        axios.get(`/projects?action=single&id=${projectId}`).then((e) => {
            setProject(e.data[0]);
        })
    }, [])
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


                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {ProjectsQaEditView}
