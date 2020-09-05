import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useParams} from 'react-router-dom';
import {Card, Col, Descriptions, Row} from "antd";
import {CommentDetails, TicketDetails} from "../../shared/Interfaces";
import {formatDate} from "../../shared/functions";

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
                    <Card title="Ticket Details" className={'mt-3'}>
                        <Descriptions bordered>
                            <Descriptions.Item label="Title" span={2}>{ticketDetails?.title}</Descriptions.Item>
                            <Descriptions.Item label="Description"
                                               span={2}>{ticketDetails?.description}</Descriptions.Item>
                            <Descriptions.Item label="Priority" span={2}>{ticketDetails?.priority}</Descriptions.Item>
                            <Descriptions.Item label="Category" span={2}>{ticketDetails?.category}</Descriptions.Item>
                            <Descriptions.Item label="Status" span={2}>{ticketDetails?.status}</Descriptions.Item>
                            <Descriptions.Item label="Creating Date"
                                               span={2}>{formatDate(ticketDetails?.creationDate)}</Descriptions.Item>
                            <Descriptions.Item label="Submitter"
                                               span={2}>{ticketDetails?.submitter.username}</Descriptions.Item>
                            <Descriptions.Item label="Assigned Developer"
                                               span={2}>{ticketDetails?.assignedDeveloper.username}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {TicketDetailsView}
