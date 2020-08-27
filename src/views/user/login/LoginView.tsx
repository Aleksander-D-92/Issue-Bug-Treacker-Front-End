import React from "react";
import {Col, Row} from "antd";
import {DemoLogin} from "./DemoLogin";
import {LoginForm} from "./LoginForm";

function LoginView() {
    return (
        <Row justify={'center'} gutter={[24, 24]} className='mt-3'>
            <Col xs={24} sm={20} md={11}>
                <LoginForm/>
            </Col>
            <Col xs={24} sm={20} md={11}>
                <DemoLogin/>
            </Col>
        </Row>
    )
}

export {LoginView}
