import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector} from "react-redux";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Card, Col, Row} from "antd";
import {UserViewModel} from "../../shared/Interfaces";
import {formatDate} from "../../shared/functions";
import {ChangePasswordForm} from "./ChangePasswordForm";
import {DeleteAccountForm} from "./DeleteAccountForm";

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
            <Card title={user?.username} style={{width: 300}}>
                <p>Id {user?.id}</p>
                <p>Registration date {formatDate(user?.registrationDate)}</p>
                <p>Authority {user?.authority.authority}</p>
                <p>Authority level {user?.authority.authorityLevel}</p>
            </Card>
            <button type={'button'}>Delete account</button>
            <Row justify={'center'} className={'mt-5'}>
                <Col xs={24} md={12}>
                    Change password Form
                    <ChangePasswordForm/>
                </Col>
            </Row>
            <Row justify={'center'} className={'mt-5'}>
                <Col xs={24} md={12}>
                    <DeleteAccountForm/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {AccountSettingsView}
