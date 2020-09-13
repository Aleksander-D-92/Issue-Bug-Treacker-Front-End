import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "antd";
import {useParams} from 'react-router-dom';
import axios from 'axios'
import {ProjectDetails, TicketDetails, UserDetails} from "../../shared/Interfaces";
import {ProjectInfo} from "./ProjectInfo";
import {DashBoardTicketTable} from "../../dashboard/DashBoardTicketTable";
import {doTicketStatistics, TicketStatistics} from "../../shared/TicketStatistics";
import {ProjectTicketsChart} from "./ProjectTicketsChart";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";


function ProjectDetailsView() {
    const [project, setProject] = useState<ProjectDetails>();

    const [tickets, setTickets] = useState<TicketDetails[]>();
    const [ticketsLoading, setTicketsLoading] = useState<boolean>(true);
    const [ticketStatistics, setTicketStatistics] = useState<TicketStatistics>();

    const [qa, setQa] = useState<UserDetails[]>();
    const {projectId} = useParams();

    useEffect(() => {
        axios.get(`/projects?action=single&id=${projectId}`).then((e) => {
            setProject(e.data[0]);
        });
        axios.get(`/projects/qa?action=assigned&projectId=${projectId}`).then((e) => {
            setQa(e.data);
        });
        axios.get(`/tickets?action=by-project&id=${projectId}`).then((e) => {
            setTickets(e.data);
            setTicketStatistics(doTicketStatistics(e.data));
            setTicketsLoading(false);
        });
    }, [])
    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Card className={'mt-3'}>
                        <ProjectInfo project={project}
                                     totalQa={qa?.length}
                                     totalTickets={tickets?.length}/>
                    </Card>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <ProjectTicketsChart ticketsLoading={ticketsLoading} statistics={ticketStatistics}/>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <DashBoardTicketTable tickets={tickets}/>
                </Col>
            </Row>
        </motion.div>
    )
}

export {ProjectDetailsView}
