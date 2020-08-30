import React from "react";
import {Col, Row} from "antd";

interface Props {
    username: string,
    authority: string
}

function DashBoardGreeting(props: Props) {
    function formatAuthority(authority: string): string {
        switch (authority) {
            case 'ROLE_PROJECT_MANAGER':
                return 'Project Managers'
            case 'ROLE_DEVELOPER':
                return 'Developers'
            case 'ROLE_QA':
                return 'QAs'
            case 'ROLE_ADMIN':
                return 'Admins'
            default:
                return '';
        }
    }

    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={24} md={24} lg={14} xl={14} className={'mt-2'}>
                    <h2>Hello {props.username}, welcome to the {formatAuthority(props.authority)} dashboard</h2>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {DashBoardGreeting}
