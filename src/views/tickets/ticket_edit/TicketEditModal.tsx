import React, {useState} from "react";
import {Button, Form, Input, Modal, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {TicketDetails, UserDetails} from "../../shared/Interfaces";


const {Option} = Select;

interface Props {
    onFinish: Function,
    ticket?: TicketDetails,
    developers?: UserDetails[]
}

function TicketEditModal(props: Props) {
    const [visible, setVisible] = useState(false);

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
                {/*todo add logic*/}
                <Form layout={'vertical'}
                      name={'ticketSubmit'}
                      initialValues={{
                          'title': props.ticket?.title,
                          'description': props.ticket?.description,
                          'priority': props.ticket?.priority,
                          'category': props.ticket?.category
                      }}
                      onFinish={(e: any) => props.onFinish(e)}>
                    <Form.Item
                        label="Title"
                        name="title"
                        validateTrigger={false}
                        rules={[{
                            required: true,
                            min: 5,
                            max: 30,
                            message: 'Must be between 5 and 30 symbols'
                        }]}
                    >
                        <Input type={'text'} placeholder={'Title must be between 5 and 30 symbols'}/>
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
                            placeholder="Select a option and change input text above"
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
                            placeholder="Select a option and change input text above"
                            allowClear
                        >
                            <Option value="BUGS_AND_ERRORS">Bugs and Errors</Option>
                            <Option value="FEATURE_REQUEST">Feature Request</Option>
                            <Option value="OTHER">Other</Option>
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
