import React from "react";
import {TicketsForProject} from "./TicketsForProject";
import {Col, Row} from "antd";
import {ProjectDescription} from "./ProjectDescriptopn";

function ProjectDetails() {
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
        </React.Fragment>
    )
}

export {ProjectDetails}
