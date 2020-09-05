import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {ProjectDetails, TicketDetails} from "../shared/Interfaces";
import axios from "axios";
import {DashBoardGreeting} from "./DashBoardGreeting";
import {ProjectsList} from "./ProjectsList";
import {DashBoardTicketTable} from "./DashBoardTicketTable";
import {TicketCharts} from "./TicketCharts";
import {Col, Row} from "antd";
import {doTicketStatistics, TicketStatistics} from "../shared/TicketStatistics";


function DashBoardView() {
    const reduxState = useSelector((state: ReduxState) => state);
    const userRole = reduxState.userDetails.authority;
    const id = reduxState.userDetails.id;

    const [tickets, setTickets] = useState<TicketDetails[]>();
    const [projects, setProjects] = useState<ProjectDetails[]>();
    const [ticketStatistics, setTicketStatistics] = useState<TicketStatistics>();

    //statistics variables


    useEffect(() => {
        switch (userRole) {
            case 'ROLE_PROJECT_MANAGER':
                axios.get(`/tickets/?action=by-project-manager&id=${id}`).then((e) => {
                    setTicketStatistics(doTicketStatistics(e.data));
                    setTickets(e.data);
                });

                axios.get(`/projects?action=own&id=${id}`).then((e) => {
                    setProjects(e.data);
                })
                break;
            case 'ROLE_DEVELOPER':
                axios.get(`/tickets/?action=by-assigned-developer&id=${id}`).then((e) => {
                    setTicketStatistics(doTicketStatistics(e.data));
                    setTickets(e.data);
                });
                axios.get(`/projects?action=include-developer&id=${id}`).then((e) => {
                    setProjects(e.data);
                });
                break
            case 'ROLE_QA':
                axios.get(`/tickets/?action=by-submitter&id=${id}`).then((e) => {
                    setTicketStatistics(doTicketStatistics(e.data));
                    setTickets(e.data);
                });
                axios.get(`/projects?action=include-qa&id=${id}`).then((e) => {
                    setProjects(e.data);
                });
                break;
            case 'ROLE_ADMIN':
                axios.get('/tickets?action=all').then((e) => {
                    setTicketStatistics(doTicketStatistics(e.data));
                    setTickets(e.data);
                });
                axios.get(`/projects?action=all`).then((e) => {
                    setProjects(e.data);
                });
                break;
        }

    }, []);
    return (
        <React.Fragment>
            <DashBoardGreeting authority={reduxState.userDetails.authority} username={reduxState.userDetails.username}/>
            <TicketCharts ticketStatistics={ticketStatistics}/>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <ProjectsList projects={projects} authority={reduxState.userDetails.authority}/>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22}>
                    <DashBoardTicketTable tickets={tickets}/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {DashBoardView}
