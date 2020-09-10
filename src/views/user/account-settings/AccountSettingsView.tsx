import React, {CSSProperties, useEffect, useState} from "react";
import axios from 'axios'
import {useSelector} from "react-redux";
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Col, Collapse, Row} from "antd";
import {UserDetails} from "../../shared/Interfaces";
import {ChangePasswordForm} from "./ChangePasswordForm";
import {DeleteAccountForm} from "./DeleteAccountForm";
import {motion} from "framer-motion";
import {routerVariant} from "../../shared/gobalVariables";
import {DisplayUserDetails} from "../admin/edit_user/DisplayUserDetails";
import {useHistory} from "react-router-dom";
import {Typography} from 'antd';

const {Text} = Typography;
const {Panel} = Collapse;

function AccountSettingsView() {
    const history = useHistory();
    const reduxState = useSelector((state: ReduxState) => state)
    const userId = reduxState.userDetails.id;
    const [user, setUserDetails] = useState<UserDetails>();
    const [userLoading, setUserLoading] = useState<boolean>(true);

    useEffect(() => {
        axios.get(`/users/?action=single&id=${reduxState.userDetails.id}`).then((e) => {
            setUserDetails(e.data[0]);
            setUserLoading(false);
        })
    }, [])

    function changePassword(e: any) {
        axios.put(`/users/password/${userId}`, {
            oldPassword: e.password,
            newPassword: e.newPassword
        }).then(() => {
            history.push("/users/logout")
        }).catch(() => {

        })
    }

    function deleteAccount(form: any) {
        console.log(form);
        axios.put(`/users/account-lock/${userId}`, {
            password: form.password
        }).then(e => {
            console.log(e);
            history.push("/users/logout");
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
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header={<Text style={headerStyle}>Account Details</Text>}
                               key="1">
                            <DisplayUserDetails userLoading={userLoading} user={user}/>
                        </Panel>
                        <Panel header={<Text style={headerStyle}>Change Password</Text>} key="2">
                            <ChangePasswordForm
                                changePassword={changePassword}/>
                        </Panel>
                        <Panel header={<Text style={headerStyle}>Delete Account</Text>} key="3">
                            <DeleteAccountForm deleteAccount={deleteAccount}/>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </motion.div>
    )
}

const headerStyle = {fontSize: '1.1rem', fontWeight: 'bold'} as CSSProperties
export {AccountSettingsView}
