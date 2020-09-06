import React, {MouseEvent, useEffect, useState} from "react";
import axios from 'axios'
import {useParams} from 'react-router-dom';
import {Card, Col, Row, Tabs} from "antd";
import {CommentDetails, TicketDetails, UserDetails} from "../../shared/Interfaces";
import {TicketDescription} from "./TicketDescription";
import {TicketComments} from "./TicketComments";
import {useSelector} from "react-redux";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {CommentSubmit} from "./CommentSubmit";
import {TicketEditModal} from "../ticket_edit/TicketEditModal";

const {TabPane} = Tabs;

function TicketDetailsView() {
    const state = useSelector((state: ReduxState) => state);
    const userId = state.userDetails.id;
    const [ticket, setTicketDetails] = useState<TicketDetails>();
    const [history, setHistory] = useState<TicketDetails[]>([]);
    const [comments, setComments] = useState<CommentDetails[]>([]);
    const [developers, setDevelopers] = useState<UserDetails[]>();
    const {ticketId} = useParams();
    useEffect(() => {
        axios.get(`/tickets?action=single&id=${ticketId}`).then((e) => {
            console.log(e.data[0]);
            setTicketDetails(e.data[0]);
        });
        axios.get(`/comments?action=by-ticket&id=${ticketId}`).then((e) => {
            setComments(e.data)
        });
        axios.get(`/tickets/history/${ticketId}`).then((e) => {
            setHistory(e.data);
        });
        if (state.userDetails.authority === 'ROLE_PROJECT_MANAGER') {
            axios.get(`/projects/devs/${state.userDetails.id}`).then((e) => {
                setDevelopers(e.data);
            });
        }
    }, [])

    function submitComment(e: any) {
        const data = {
            userId: userId,
            description: e.description
        }
        axios.post(`/comments/${ticketId}`, data).then((e) => {
            setComments(arr => [e.data[0], ...arr]);
        });
    }

    function editTicket(e: any) {
        const currentTicketId = e.ticketId;
        const data = {
            title: e.title,
            description: e.description,
            priority: e.priority,
            category: e.category,
            status: e.status,
            assignedDeveloperId: e.assignedDeveloperId
        }
        axios.put(`/tickets/${currentTicketId}/manager`, data).then((e) => {
            let {...updatedTicket} = ticket;
            updatedTicket.title = data.title;
            updatedTicket.description = data.description;
            updatedTicket.priority = data.priority;
            updatedTicket.category = data.category;
            updatedTicket.status = data.status;
            if (updatedTicket.assignedDeveloper !== null) {
                updatedTicket.assignedDeveloper.userId = data.assignedDeveloperId;
            }
            const username = developers?.find(dev => dev.userId === data.assignedDeveloperId)?.username;
            if (updatedTicket.assignedDeveloper !== null) {
                updatedTicket.assignedDeveloper.username = username || '';
            }
            setTicketDetails(updatedTicket);
        })
    }

    function deleteComment(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let id = e.currentTarget.id;
        axios.delete(`/comments/${id}`).then((e) => {
            setComments(arr => arr.filter(e => e.commentId !== parseInt(id)));
        })
    }

    function editComment(e: any) {
        const commentId = e.commentId;
        const description = e.comment;
        axios.put(`/comments/${commentId}`, {description: description}).then((e) => {
            setComments((comments) => {
                return comments.map(comment => {
                    if (comment.commentId === commentId) {
                        comment.description = description
                    }
                    return comment;
                });
            })
        });
    }

    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <TicketDescription ticket={ticket}/>
                    <TicketEditModal onFinish={editTicket}
                                     ticket={ticket}
                                     developers={developers}/>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <CommentSubmit submitComment={submitComment}/>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Card title="Comments and history" className={'mt-3'}>
                        <Tabs defaultActiveKey="1" type="card" size={'large'} className={'mt-3'}>
                            <TabPane tab="Comments" key="1">
                                <TicketComments comments={comments} loggedUserId={userId}
                                                deleteComment={deleteComment} editComment={editComment}/>
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
