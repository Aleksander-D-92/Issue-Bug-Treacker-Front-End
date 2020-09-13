import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {TicketDetails} from "../../shared/Interfaces";
import {Col, Row} from "antd";
import {TicketsGreeting} from "../my_tickets/MyTicketsHeader";
import {DashBoardTicketTable} from "../../dashboard/DashBoardTicketTable";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";
import {Typography} from 'antd';

const {Title} = Typography;

function AllTicketsView() {
    const state = useSelector((state: ReduxState) => state);
    const authority = state.userDetails.authority;
    const [tickets, setTickets] = useState<TicketDetails[]>();
    useEffect(() => {
        axios.get(`/tickets?action=all`).then((e) => {
            setTickets(e.data);
        })
    }, [])
    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <Row justify={'center'}>
                <Col xs={24} sm={22}>
                    <Title level={2}>{'All fo the tickets currently in the DB'}</Title>
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

export {AllTicketsView}
