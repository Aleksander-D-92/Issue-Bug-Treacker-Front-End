import React from "react";
import {Button, Collapse, Form, Typography} from "antd";
import TextArea from "antd/es/input/TextArea";
import {FormInstance} from "antd/es/form";

const {Text} = Typography;
const {Panel} = Collapse;

interface Props {
    submitComment: Function,
    btnLoading: boolean,
    form: FormInstance
}

function CommentSubmit(props: Props) {
    return (
        <Collapse defaultActiveKey={['1']} className={'mt-3'}>
            <Panel header={<Text style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Submit a new comment</Text>} key="1">
                <Form layout={'vertical'}
                      form={props.form}
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
                    <Button htmlType="submit"
                            block={true}
                            type={'primary'}
                            loading={props.btnLoading}>
                        Submit new comment
                    </Button>
                </Form>
            </Panel>
        </Collapse>
    )
}

export {CommentSubmit}
