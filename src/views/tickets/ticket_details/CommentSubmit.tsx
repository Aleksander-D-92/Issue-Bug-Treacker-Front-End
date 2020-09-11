import React from "react";
import {Button, Card, Form} from "antd";
import TextArea from "antd/es/input/TextArea";

interface Props {
    submitComment: Function,
    btnLoading:boolean
}

function CommentSubmit(props: Props) {
    return (
        <Card title="Submit a new comment" className={'mt-3'}>
            <Form layout={'vertical'}
                  name={'commentSubmit'}
                  onFinish={(e: any) => props.submitComment(e)}>
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
                <Button htmlType="submit" block type={'primary'} loading={props.btnLoading}>
                    Submit new comment
                </Button>
            </Form>
        </Card>
    )
}

export {CommentSubmit}
