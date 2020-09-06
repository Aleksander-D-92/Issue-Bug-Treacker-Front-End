import React, {useState} from "react";
import {Button, Form, Input, Modal, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {TicketDetails, UserDetails} from "../../shared/Interfaces";
import {capitalizeString} from "../../shared/functions";


const {Option} = Select;

interface Props {
    onFinish: Function,
    ticket?: TicketDetails,
    developers?: UserDetails[]
}

function TicketEditModal(props: Props) {
    const [visible, setVisible] = useState(false);
    const [devName, setDevName] = useState<string>('');

    function handleChange(e: any) {
        console.log(e);
        setDevName('');
    }

    function showModal() {
        setVisible(true);
    }

    function handleCancel() {
        setVisible(false);
    }

    return (
        <React.Fragment>

            <Button type="primary" onClick={showModal} block={true}>
                Edit Ticket
            </Button>
            <Modal
                title="Edit comment"
                visible={visible}
                onOk={handleCancel}
                onCancel={handleCancel}
                footer={[]}
            >
                <Form layout={'vertical'}
                      name={'ticketSubmit'}
                      initialValues={{
                          'ticketId': props.ticket?.ticketId,
                          'title': props.ticket?.title,
                          'description': props.ticket?.description,
                          'priority': props.ticket?.priority,
                          'category': props.ticket?.category,
                          'status': props.ticket?.status,
                          'assignedDeveloperId': (props.ticket?.assignedDeveloper !== null) ? props.ticket?.assignedDeveloper.userId : null
                      }}
                      onFinish={(e: any) => props.onFinish(e)}>
                    {/*dummy item for ticket id*/}
                    <Form.Item name="ticketId">
                        <Input style={{display: 'none'}}/>
                    </Form.Item>
                    <Form.Item
                        label="Title"
                        name="title"
                        validateTrigger={false}
                        rules={[{
                            required: true,
                            min: 5,
                            max: 40,
                            message: 'Title must be between 5 and 40 symbols'
                        }]}
                    >
                        <Input type={'text'} placeholder={'Title must be between 5 and 40 symbols'}/>
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        validateTrigger={false}
                        rules={[{
                            required: true,
                            min: 10,
                            max: 255,
                            message: 'Description must be between 10 and 255 symbols'
                        }]}
                    >
                        <TextArea rows={4} placeholder={'must be between 10 and 255 symbols'}/>
                    </Form.Item>

                    <Form.Item name="priority" label="Priority"
                               rules={[{required: true, message: 'You must select a Priority'}]}>
                        <Select
                            placeholder="Chose a priority"
                            allowClear
                        >
                            <Option value="LOW">Low</Option>
                            <Option value="MEDIUM">Medium</Option>
                            <Option value="HIGH">High</Option>
                            <Option value="URGENT">Urgent</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="category" label="Category"
                               rules={[{required: true, message: 'You must select a Category'}]}>
                        <Select
                            placeholder="Chose a category"
                            allowClear
                        >
                            <Option value="BUGS_AND_ERRORS">Bugs and Errors</Option>
                            <Option value="FEATURE_REQUEST">Feature Request</Option>
                            <Option value="OTHER">Other</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="status" label="Status"
                               rules={[{required: false, message: 'You must select a Status'}]}>
                        <Select
                            placeholder="Change the status"
                            allowClear
                        >
                            <Option value="UNASSIGNED">Unassigned</Option>
                            <Option value="RESOLVED">Resolved</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="assignedDeveloperId" label="Chose a developer to assign to the ticket"
                               rules={[{required: false, message: ''}]}>
                        <Select
                            placeholder="Assign a developer"
                            allowClear
                            onChange={handleChange}
                        >
                            {props.developers?.map(d => <Option
                                value={d.userId}>{capitalizeString(d.username)}</Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit new ticket
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>

        </React.Fragment>
    )
}

export {TicketEditModal}
