import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector} from "react-redux";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Card, Col, Collapse, Descriptions, Row} from "antd";
import {UserViewModel} from "../../shared/Interfaces";
import {formatDate} from "../../shared/functions";
import {ChangePasswordForm} from "./ChangePasswordForm";
import {DeleteAccountForm} from "./DeleteAccountForm";

const {Panel} = Collapse;

function AccountSettingsView() {
    const reduxState = useSelector((state: ReduxState) => state)
    const [user, setUserDetails] = useState<UserViewModel>();
    useEffect(() => {
        axios.get(`/users/?action=single&id=${reduxState.userDetails.id}`, {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            setUserDetails(e.data[0]);
            console.log(e);
        })
    }, [])

    return (
        <React.Fragment>
            <Row justify={'center'} className={'mt-5'}>
                <Col xs={24} md={16}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header={<h2>Account Details</h2>} key="1">
                            <Descriptions title={`Account Details for ${user?.username}`} bordered={true}>
                                <Descriptions.Item label="Id" span={2}>{user?.id}</Descriptions.Item>
                                <Descriptions.Item label="Registration date"
                                                   span={2}>{formatDate(user?.registrationDate)}</Descriptions.Item>
                                <Descriptions.Item label="Authority"
                                                   span={2}>{user?.authority.authority}</Descriptions.Item>
                                <Descriptions.Item label="Authority level"
                                                   span={2}>{user?.authority.authorityLevel}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                        <Panel header={<h2>Change Password</h2>} key="2">
                            <ChangePasswordForm/>
                        </Panel>
                        <Panel header={<h2>Delete Account</h2>} key="3">
                            <DeleteAccountForm/>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {AccountSettingsView}
