import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useParams} from 'react-router-dom';
import {Card, Col, Row, Tabs} from "antd";
import {CommentDetails, TicketDetails} from "../../shared/Interfaces";
import {TicketDescription} from "./TicketDescription";
import {TicketComments} from "./TicketComments";

const {TabPane} = Tabs;

function TicketDetailsView() {
    const [ticketDetails, setTicketDetails] = useState<TicketDetails>();
    const [history, setHistory] = useState<TicketDetails[]>();
    const [comments, setComments] = useState<CommentDetails[]>();
    const {ticketId} = useParams();
    useEffect(() => {
        axios.get(`/tickets?action=single&id=${ticketId}`).then((e) => {
            setTicketDetails(e.data[0]);
        });
        axios.get(`/comments?action=by-ticket&id=${ticketId}`).then((e) => {
            setComments(e.data);
        });
        axios.get(`/tickets/history/${ticketId}`).then((e) => {
            setHistory(e.data);
        });
    }, [])
    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <TicketDescription ticket={ticketDetails}/>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Card title="Comments and history" className={'mt-3'}>
                        <Tabs defaultActiveKey="1" type="card" size={'large'} className={'mt-3'}>
                            <TabPane tab="Comments" key="1">
                                <TicketComments comments={comments}/>
                            </TabPane>
                            <TabPane tab="Ticket History" key="2">
                                Content of card tab 2
                                {/*todo add history*/}
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {TicketDetailsView}
