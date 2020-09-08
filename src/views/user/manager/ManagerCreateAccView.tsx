import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector} from 'react-redux';
import {Col, Form, Row} from "antd";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Authority} from "../../shared/Interfaces";
import {ManagerCreateAcc} from "./ManagetCreateAcc";

function ManagerCreateAccView() {
    const state = useSelector((state: ReduxState) => state);
    const [authorities, setAuthorities] = useState<Authority[]>()
    const [form] = Form.useForm();
    const managerId = state.userDetails.id;
    useEffect(() => {
        axios.get(`/authorities/all`).then((e) => {
            setAuthorities(e.data);
        });
    }, [])

    function onFinish(e: any) {
        const data = {
            username: e.username,
            password: e.password,
            confirmPassword: e.confirmPassword,
            authorityId: e.authorityId
        };
        console.log(data);
        console.log(managerId);
        axios.post(`/users/register?managerId=${managerId}`, data).then((e) => {
            form.setFieldsValue({
                'username': '',
                'password': '',
                'confirmPassword': '',
                'authorityId': '',
            })
        })
    }

    return (
        <Row justify={'center'}>
            <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                <ManagerCreateAcc authorities={authorities}
                                  onFinish={onFinish}
                                  form={form}/>
            </Col>
        </Row>
    )
}

export {ManagerCreateAccView}
