import React, {MouseEvent, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'
import {Card, Col, Form, Row} from "antd";
import {Authority, UserDetails} from "../../../shared/Interfaces";
import {DisplayUserDetails} from "./DisplayUserDetails";
import {EditUserAuthority} from "./EditUserAuthority";
import {ChangeAccountLock} from "./ChangeAccountLock";
import {motion} from "framer-motion";
import {routerVariant} from "../../../shared/gobalVariables";


function EditUserVIew() {
    const {userId} = useParams();
    const [user, setUser] = useState<UserDetails>();
    const [userLoading, setUserLoading] = useState<boolean>(true);

    const [authorities, setAuthorities] = useState<Authority[]>([]);
    const [authoritiesLoading, setAuthoritiesLoading] = useState<boolean>(true);

    const [lockAccountLoading, setLockAccountLoading] = useState<boolean>(true);
    const [formState] = Form.useForm();

    useEffect(() => {
        axios.get(`/users?action=single&id=${userId}`).then((e) => {
            setUser(e.data[0]);
            setUserLoading(false);
            setLockAccountLoading(false);
        });
        axios.get('/authorities/all').then((e) => {
            setAuthorities(e.data.filter((a: Authority) => a.authorityLevel !== 4));
            setAuthoritiesLoading(false)
        })
    }, [])

    function changeAuthority(form: any) {
        setAuthoritiesLoading(true);
        const {...updatedUser} = user;
        switch (form.authorityId) {
            case 1:
                updatedUser.authority.authorityId = 1;
                updatedUser.authority.authorityLevel = 1;
                updatedUser.authority.authority = 'ROLE_QA';
                break;
            case 2:
                updatedUser.authority.authorityId = 2;
                updatedUser.authority.authorityLevel = 2;
                updatedUser.authority.authority = 'ROLE_DEVELOPER';
                break;
            case 3:
                updatedUser.authority.authorityId = 3;
                updatedUser.authority.authorityLevel = 3;
                updatedUser.authority.authority = 'ROLE_PROJECT_MANAGER';
                break;
        }
        axios.put(`/admins/user-authority?authorityId=${form.authorityId}&userId=${userId}`).then(() => {
            setUser(updatedUser);
            formState.setFieldsValue({'authorityId': ''});
            setAuthoritiesLoading(false);
        });
    }

    function lockAccount(e: MouseEvent<HTMLButtonElement>) {
        setLockAccountLoading(true);
        let name = e.currentTarget.name;
        const {...updatedUser} = user;
        updatedUser.accountNonLocked = name !== 'lock';
        axios.put(`/admins/user-account-lock?action=${name}&userId=${userId}`).then(() => {
            setUser(updatedUser);
            setLockAccountLoading(false);
        });
    }

    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <Row justify={'center'} className={'mt-3'}>
                <Col xs={24} sm={23} md={23} lg={14}>
                    <Card title="You can ban/lock this users account or change its authority">
                        <DisplayUserDetails user={user}
                                            userLoading={userLoading}/>
                        <EditUserAuthority user={user}
                                           loading={authoritiesLoading}
                                           authorities={authorities}
                                           changeAuthority={changeAuthority}
                                           formState={formState}/>
                        <ChangeAccountLock user={user}
                                           lockAccountLoading={lockAccountLoading}
                                           lockAccount={lockAccount}/>
                    </Card>
                </Col>
            </Row>
        </motion.div>
    )
}

export {EditUserVIew}
