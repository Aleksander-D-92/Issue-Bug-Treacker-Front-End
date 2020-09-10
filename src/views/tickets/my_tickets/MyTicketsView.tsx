import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {TicketDetails} from "../../shared/Interfaces";
import {DashBoardTicketTable} from "../../dashboard/DashBoardTicketTable";
import {Col, Row} from "antd";
import {TicketsGreeting} from "./MyTicketsHeader";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";


function MyTicketsView() {
    const state = useSelector((state: ReduxState) => state);
    const id = state.userDetails.id;
    const authority = state.userDetails.authority;
    const [tickets, setTickets] = useState<TicketDetails[]>();

    useEffect(() => {
        switch (authority) {
            case 'ROLE_PROJECT_MANAGER':
                axios.get(`/tickets/?action=by-project-manager&id=${id}`).then((e) => {
                    setTickets(e.data);
                });
                break;
            case 'ROLE_DEVELOPER':
                axios.get(`/tickets/?action=by-assigned-developer&id=${id}`).then((e) => {
                    setTickets(e.data);
                });
                break
            case 'ROLE_QA':
                axios.get(`/tickets/?action=by-submitter&id=${id}`).then((e) => {
                    setTickets(e.data);
                });
                break;
            case 'ROLE_ADMIN':
                axios.get('/tickets?action=all').then((e) => {
                    setTickets(e.data);
                });
                break;
        }
    }, [authority, id])
    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <Row justify={'center'}>
                <Col xs={24} sm={22}>
                    <TicketsGreeting username={state.userDetails.username}
                                     authority={state.userDetails.authority}/>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22}>
                    <DashBoardTicketTable tickets={tickets}/>
                </Col>
            </Row>
        </motion.div>
    )
}

export {MyTicketsView}
