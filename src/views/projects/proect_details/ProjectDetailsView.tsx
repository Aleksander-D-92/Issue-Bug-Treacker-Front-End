import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios'
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {ProjectDetails, TicketDetails, UserDetails} from "../../shared/Interfaces";
import {DisplayDetails} from "./DisplayDetails";
import {DashBoardTicketTable} from "../../dashboard/DashBoardTicketTable";


function ProjectDetailsView() {
    const state = useSelector((state: ReduxState) => state);
    const [project, setProject] = useState<ProjectDetails[]>();
    const [tickets, setTickets] = useState<TicketDetails[]>();
    const [qa, setQa] = useState<UserDetails[]>();
    const {projectId} = useParams();
    useEffect(() => {
        axios.get(`/projects?action=single&id=${projectId}`).then((e) => {
            setProject(e.data);
        });
        axios.get(`/projects/qa?action=assigned&projectId=${projectId}`).then((e) => {
            setQa(e.data);
        });
        axios.get(`/tickets?action=by-project&id=${projectId}`).then((e) => {
            setTickets(e.data);
        });
    }, [])
    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <DisplayDetails projects={project} />
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <DashBoardTicketTable tickets={tickets}/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {ProjectDetailsView}
