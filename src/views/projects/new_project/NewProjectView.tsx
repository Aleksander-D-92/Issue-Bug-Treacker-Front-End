import React, {useState} from "react";
import {useSelector} from 'react-redux';
import axios from 'axios'
import {Button, Card, Col, Form, Input, Row} from "antd";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {useHistory} from 'react-router-dom';
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";

const {TextArea} = Input;


function NewProjectView() {
    const state = useSelector((state: ReduxState) => state);
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);

    function submitProject(e: any) {
        setLoading(true);
        const data = {
            title: e.title,
            description: e.description
        }
        axios.post(`/projects/${state.userDetails.id}`, data).then((e) => {
            history.push(`/projects/my`);
        }).catch(() => {
            setLoading(false);
        })
    }

    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <Row justify={'center'}>
                <Col xs={24} sm={23} md={23} lg={14}>
                    <Card title={'Submit a new project'} className={'mt-3'}>
                        <Form layout={'vertical'}
                              name={'projectEditForm'}
                              initialValues={{}}
                              onFinish={submitProject}>
                            <Form.Item
                                label="Title"
                                name="title"
                                validateTrigger={false}
                                rules={[{
                                    required: true,
                                    min: 5,
                                    max: 50,
                                    message: 'Title must be between 10 and 50 symbols long',

                                }]}
                            >
                                <Input type={'text'}
                                       allowClear={true}
                                       placeholder={'Title must be between 10 and 50 symbols long'}/>
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                name="description"
                                validateTrigger={false}
                                rules={[{
                                    required: true,
                                    min: 10,
                                    max: 255,
                                    message: 'Description must be between 10 and 255 symbols long',

                                }]}
                            >
                                <TextArea rows={4}
                                          allowClear={true}
                                          placeholder={'Description must be between 10 and 255 symbols long'}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary"
                                        htmlType="submit"
                                        block
                                        loading={loading}>
                                    Create new project
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </motion.div>
    )
}

export {NewProjectView}
