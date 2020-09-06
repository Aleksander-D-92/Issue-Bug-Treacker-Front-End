import React, {useEffect, useState, MouseEvent} from "react";
import axios from 'axios'
import {useParams} from 'react-router-dom';
import {Button, Card, Col, Form, Row, Tabs} from "antd";
import {CommentDetails, TicketDetails} from "../../shared/Interfaces";
import {TicketDescription} from "./TicketDescription";
import {TicketComments} from "./TicketComments";
import TextArea from "antd/es/input/TextArea";
import {useSelector} from "react-redux";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {CommentEdit} from "./CommentEdit";

const {TabPane} = Tabs;

function TicketDetailsView() {
    const state = useSelector((state: ReduxState) => state);
    const userId = state.userDetails.id;
    const [ticketDetails, setTicketDetails] = useState<TicketDetails>();
    const [history, setHistory] = useState<TicketDetails[]>([]);
    const [comments, setComments] = useState<CommentDetails[]>([]);
    const {ticketId} = useParams();
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

    function deleteComment(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let id = e.currentTarget.id;
        axios.delete(`/comments/${id}`).then((e) => {
            setComments(arr => arr.filter(e => e.commentId !== parseInt(id)));
        })
    }

    function editComment(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        let id = e.currentTarget.id;
        axios.put(`/comments/${id}`, {}).then((e) => {

        });
    }

    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <CommentEdit/>
                    <TicketDescription ticket={ticketDetails}/>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Card title="Submit a new comment" className={'mt-3'}>
                        <Form layout={'vertical'}
                              name={'commentSubmit'}
                              onFinish={submitComment}>
                            <Form.Item
                                label="Description"
                                name="description"
                                validateTrigger={false}
                                rules={[{
                                    required: true,
                                    min: 5,
                                    max: 255,
                                    message: 'Must be between 10 and 255 symbols'
                                }]}
                            >
                                <TextArea rows={4} placeholder={'Title must be between 10 and 255 symbols'}/>
                            </Form.Item>
                            <Button htmlType="submit" block type={'primary'}>
                                Submit new comment
                            </Button>
                        </Form>
                    </Card>
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
