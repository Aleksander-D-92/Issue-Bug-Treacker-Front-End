import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import {Col, Form, Row} from "antd";
import {Authority} from "../../shared/Interfaces";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";
import {RegisterForm} from "./UserRegisterForm";


function UserRegisterView() {
    const history = useHistory();
    const [form] = Form.useForm();
    const [authorities, setAuthorities] = useState<Authority[]>();
    const [buttonLoading, setButtonLoading] = useState(true);

    useEffect(() => {
        axios.get(`/authorities/all`).then((e) => {
            setAuthorities(e.data);
            form.setFieldsValue({'authorityId': 3})
            setButtonLoading(false);
        })
    }, [])

    function onFinish(registerForm: any) {
        setButtonLoading(true);
        axios.post('/users/register', registerForm).then(() => {
            history.push('/users/login')
        }).catch(() => {
            setButtonLoading(false)
        })
    }

    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <Row justify={'center'} className={'mt-3'}>
                <Col xs={24} sm={23} md={23} lg={14}>
                    <RegisterForm form={form}
                                  authorities={authorities}
                                  buttonLoading={buttonLoading}
                                  onFinish={onFinish}/>
                </Col>
            </Row>
        </motion.div>
    )
}

export {UserRegisterView}
