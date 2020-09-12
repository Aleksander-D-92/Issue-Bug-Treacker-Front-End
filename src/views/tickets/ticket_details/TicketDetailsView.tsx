import React, {MouseEvent, useEffect, useState} from "react";
import axios from 'axios'
import {useParams} from 'react-router-dom';
import {Col, Collapse, Form, Row, Tabs, Typography} from "antd";
import {CommentDetails, HistoryDetails, TicketDetails, UserDetails} from "../../shared/Interfaces";
import {TicketDescription} from "./TicketDescription";
import {TicketComments} from "./TicketComments";
import {useSelector} from "react-redux";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {CommentSubmit} from "./CommentSubmit";
import {TicketEditModal} from "../ticket_edit/TicketEditModal";
import {TicketHistoryTable} from "./TicketHistoryTable";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";

const {Panel} = Collapse;

const {Text} = Typography;

const {TabPane} = Tabs;

function TicketDetailsView() {
    const {ticketId} = useParams();
    const [commentForm] = Form.useForm();
    const state = useSelector((state: ReduxState) => state);
    const userId = state.userDetails.id;
    const authority = state.userDetails.authority;

    const [developers, setDevelopers] = useState<UserDetails[]>();


    const [ticket, setTicketDetails] = useState<TicketDetails>();
    const [editTicketLoading, setEditTicketLoading] = useState<boolean>(false);
    const [editTicketVisible, setEditTicketVisible] = useState<boolean>(false);

    const [comments, setComments] = useState<CommentDetails[]>([]);
    const [submitCommentLoading, setSubmitCommentLoading] = useState<boolean>(false);
    const [commentFunctionsLoading, setCommentFunctionsLoading] = useState<boolean>(false);

    const [history, setHistory] = useState<HistoryDetails[]>([]);

    useEffect(() => {
        axios.get(`/tickets?action=single&id=${ticketId}`).then((e) => {
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

    function showModal() {
        setEditTicketVisible(true);
    }

    function handleCancel() {
        setEditTicketVisible(false);
    }

    function editTicket(e: any) {
        setEditTicketLoading(true);
        const currentTicketId = e.ticketId;
        const data = {
            title: e.title,
            description: e.description,
            priority: e.priority,
            category: e.category,
            status: e.status,
            assignedDeveloperId: e.assignedDeveloperId,
            resolved: e.resolved //used for devs only
        }
        if (e.assignedDeveloperId === null || e.assignedDeveloperId === -1) {
            data.assignedDeveloperId = null
        }

        let action = '';
        switch (authority) {
            case 'ROLE_PROJECT_MANAGER':
                action = 'manager'
                break;
            case 'ROLE_DEVELOPER':
                action = 'developer'
                break;
            case 'ROLE_QA':
                action = 'qa';
                break;
            default:
                action = ''
                break;
        }
        axios.put(`/tickets/${currentTicketId}/${action}`, data).then(() => {
            let {...updatedTicket} = ticket;
            updatedTicket.title = data.title;
            updatedTicket.description = data.description;
            updatedTicket.priority = data.priority;
            updatedTicket.category = data.category;
            //check status
            if (data.status === undefined) {
                // @ts-ignore
                updatedTicket.status = ticket?.status;
            } else {
                updatedTicket.status = data.status;
            }
            //init an "empty" assignedDeveloper Object so that we can assign values to it
            if (updatedTicket.assignedDeveloper === null) {
                updatedTicket.assignedDeveloper = {
                    userId: -1,
                    username: '',
                    accountNonLocked: true,
                    registrationDate: new Date()
                }
            }

            updatedTicket.assignedDeveloper.userId = data.assignedDeveloperId;
            const username = developers?.find(dev => dev.userId === data.assignedDeveloperId)?.username;
            updatedTicket.assignedDeveloper.username = username || '';
            setTicketDetails(updatedTicket);
            setEditTicketLoading(false);
            handleCancel();
            // @ts-ignore
            setHistory((history) => [updatedTicket, ...history])
        }).catch(() => {
            handleCancel();
        })
    }

    function submitComment(e: any) {
        setSubmitCommentLoading(true);
        commentForm.setFieldsValue({'description': ''})
        const data = {
            userId: userId,
            description: e.description
        }
        axios.post(`/comments/${ticketId}`, data).then((e) => {
            setSubmitCommentLoading(false);
            setComments(arr => [e.data[0], ...arr]);
        }).catch(() => {
            setSubmitCommentLoading(false);
        });
    }

    function deleteComment(e: MouseEvent<HTMLButtonElement>) {
        setCommentFunctionsLoading(true);
        e.preventDefault();
        let id = e.currentTarget.id;
        axios.delete(`/comments/${id}`).then((e) => {
            setComments(arr => arr.filter(e => e.commentId !== parseInt(id)));
            setCommentFunctionsLoading(false);
        }).catch(() => {
            setCommentFunctionsLoading(false);
        })
    }

    function editComment(e: any) {
        setCommentFunctionsLoading(true);
        const commentId = e.commentId;
        const description = e.comment;
        axios.put(`/comments/${commentId}`, {description: description}).then(() => {
            setComments((comments) => {
                return comments.map(comment => {
                    if (comment.commentId === commentId) {
                        comment.description = description
                    }
                    return comment;
                });
            })
            setCommentFunctionsLoading(false);
        }).catch(() => {
            setCommentFunctionsLoading(false);
        });
    }

    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <TicketDescription ticket={ticket}/>
                    <TicketEditModal onFinish={editTicket}
                                     authority={authority}
                                     editTicketLoading={editTicketLoading}
                                     ticket={ticket}
                                     developers={developers}
                                     visible={editTicketVisible}
                                     showModal={showModal}
                                     handleCancel={handleCancel}/>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <CommentSubmit form={commentForm}
                                   submitComment={submitComment}
                                   btnLoading={submitCommentLoading}/>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Collapse defaultActiveKey={['1']} className={'mt-3'}>
                        <Panel
                            header={<Text style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Comments and history</Text>}
                            key="1">
                            <Tabs defaultActiveKey="1" type="card" size={'large'} className={'mt-3'}>
                                <TabPane tab="Comments" key="1">
                                    <TicketComments commentFunctionsLoading={commentFunctionsLoading}
                                                    comments={comments}
                                                    loggedUserId={userId}
                                                    deleteComment={deleteComment}
                                                    editComment={editComment}/>
                                </TabPane>
                                <TabPane tab="Ticket History" key="2">
                                    <TicketHistoryTable history={history}/>
                                </TabPane>
                            </Tabs>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>

        </motion.div>
    )
}

export {TicketDetailsView}
