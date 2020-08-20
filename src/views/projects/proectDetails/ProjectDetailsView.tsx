import React, {useEffect, useState} from "react";
import {SubmitTicketForm} from "./SubmitTicketForm";
import {TicketsForProject} from "./TicketsForProject";
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios'
import {Col, Row} from "antd";
import {ProjectDescription} from "./ProjectDescriptopn";

function ProjectDetails() {
    const {projectId} = useParams();
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <ProjectDescription/>
                </Col>
                <Col>
                    <TicketsForProject/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Project details for project {projectId}</h1>
                    <SubmitTicketForm/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {ProjectDetails}
