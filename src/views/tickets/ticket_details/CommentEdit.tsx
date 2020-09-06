import React, {useState} from "react";
import {Button, Form, Input, Modal} from "antd";

const {TextArea} = Input;

interface Props {
    commentValue: string
}

function CommentEdit(props: Props) {
    const [visible, setVisible] = useState(false)

    function handleCancel() {
        setVisible(false);
    }

    function showModal() {
        setVisible(true);
    }

    function onFinish() {
        setVisible(false);
    }

    return (
        <React.Fragment>
            <Button type="primary" onClick={showModal}>
                Edit comment
            </Button>
            <Modal
                title="Edit comment"
                visible={visible}
                onCancel={handleCancel}
                footer={[]}
            >
                {/*todo add logic*/}
                <Form
                    name="editComment"
                    initialValues={{'comment': props.commentValue}}
                    onFinish={onFinish}
                    layout={'vertical'}
                >
                    <Form.Item
                        label="Edit comment"
                        name="comment"
                        validateTrigger={false}
                        rules={[{
                            required: true,
                            min: 10, max: 255,
                            message: 'Must be between 10 and 255 chars'
                        }]}>
                        <TextArea placeholder={'Enter new comment value'} allowClear={true} rows={5}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block={true}>
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button block={true} danger={true} onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export {CommentEdit}
