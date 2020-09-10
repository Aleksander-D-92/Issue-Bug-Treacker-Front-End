import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {ProjectDetails, TicketDetails} from "../shared/Interfaces";
import axios from "axios";
import {DashBoardGreeting} from "./DashBoardGreeting";
import {ProjectsList} from "../projects/projects_list/ProjectsList";
import {DashBoardTicketTable} from "./DashBoardTicketTable";
import {DashBoardCharts} from "./DashBoardCharts";
import {Col, Row} from "antd";
import {doTicketStatistics, TicketStatistics} from "../shared/TicketStatistics";
import {motion} from 'framer-motion'
import {routerVariant} from "../shared/gobalVariables";


function DashBoardView() {
    const reduxState = useSelector((state: ReduxState) => state);
    const userRole = reduxState.userDetails.authority;
    const id = reduxState.userDetails.id;

    const [tickets, setTickets] = useState<TicketDetails[]>();
    const [projects, setProjects] = useState<ProjectDetails[]>();
    const [ticketStatistics, setTicketStatistics] = useState<TicketStatistics>();
    const [ticketsLoading, setTicketsLoading] = useState<boolean>(true);
    const [projectsLoading, setProjectsLoading] = useState<boolean>(true);

    useEffect(() => {
        switch (userRole) {
            case 'ROLE_PROJECT_MANAGER':
                axios.get(`/tickets/?action=by-project-manager&id=${id}`).then((e) => {
                    setTicketStatistics(doTicketStatistics(e.data));
                    setTickets(e.data);
                    setTicketsLoading(false);
                });

                axios.get(`/projects?action=own&id=${id}`).then((e) => {
                    setProjects(e.data);
                    setProjectsLoading(false);
                })
                break;
            case 'ROLE_DEVELOPER':
                axios.get(`/tickets/?action=by-assigned-developer&id=${id}`).then((e) => {
                    setTicketStatistics(doTicketStatistics(e.data));
                    setTickets(e.data);
                    setTicketsLoading(false);
                });
                axios.get(`/projects?action=include-developer&id=${id}`).then((e) => {
                    setProjects(e.data);
                    setProjectsLoading(false);

                });
                break
            case 'ROLE_QA':
                axios.get(`/tickets/?action=by-submitter&id=${id}`).then((e) => {
                    setTicketStatistics(doTicketStatistics(e.data));
                    setTickets(e.data);
                    setTicketsLoading(false);
                });
                axios.get(`/projects?action=include-qa&id=${id}`).then((e) => {
                    setProjects(e.data);
                    setProjectsLoading(false);
                });
                break;
            case 'ROLE_ADMIN':
                axios.get('/tickets?action=all').then((e) => {
                    setTicketStatistics(doTicketStatistics(e.data));
                    setTickets(e.data);
                    setTicketsLoading(false);
                });
                axios.get(`/projects?action=all`).then((e) => {
                    setProjects(e.data);
                    setProjectsLoading(false);
                });
                break;
        }

    }, []);
    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <DashBoardGreeting authority={reduxState.userDetails.authority}
                               username={reduxState.userDetails.username}/>
            <DashBoardCharts ticketStatistics={ticketStatistics}
                             ticketsLoading={ticketsLoading}/>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <ProjectsList projects={projects}
                                  authority={reduxState.userDetails.authority}
                                  projectsLoading={projectsLoading}/>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22}>
                    <DashBoardTicketTable tickets={tickets}
                                          ticketsLoading={ticketsLoading}/>
                </Col>
            </Row>
        </motion.div>
    )
}

export {DashBoardView}
