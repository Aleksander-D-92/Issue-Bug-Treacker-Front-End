import React, {useEffect, useState} from "react";
import axios from 'axios';
import {useParams, useHistory} from 'react-router-dom';
import {Card, Col, Row} from "antd";
import {ProjectDetails} from "../../shared/Interfaces";


function ProjectEditView() {
    const {projectId} = useParams();
    const [projectDetails, setProjectDetails] = useState<ProjectDetails[]>()
    useEffect(() => {

    })
    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Card title="Edit your project" className={'mt-3'}>

                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {ProjectEditView}
