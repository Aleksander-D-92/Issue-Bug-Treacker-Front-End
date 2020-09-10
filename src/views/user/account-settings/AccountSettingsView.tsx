import React, {useEffect, useState} from "react";
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

const {Panel} = Collapse;

function AccountSettingsView() {
    const reduxState = useSelector((state: ReduxState) => state)
    const [user, setUserDetails] = useState<UserDetails>();
    const [userLoading, setUserLoading] = useState<boolean>(true);
    useEffect(() => {
        axios.get(`/users/?action=single&id=${reduxState.userDetails.id}`).then((e) => {
            setUserDetails(e.data[0]);
            setUserLoading(false);
        })
    }, [])

    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <Row justify={'center'} className={'mt-3'}>
                <Col xs={24} sm={23} md={23} lg={14}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header={<h2>Account Details</h2>} key="1">
                            <DisplayUserDetails userLoading={userLoading} user={user}/>
                        </Panel>
                        <Panel header={<h2>Change Password</h2>} key="2">
                            <ChangePasswordForm userId={reduxState.userDetails.id}/>
                        </Panel>
                        <Panel header={<h2>Delete Account</h2>} key="3">
                            <DeleteAccountForm userId={reduxState.userDetails.id}/>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </motion.div>
    )
}

export {AccountSettingsView}
