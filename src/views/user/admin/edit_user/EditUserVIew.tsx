import React, {MouseEvent, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'
import {Card, Col, Form, Row} from "antd";
import {Authority, UserDetails} from "../../../shared/Interfaces";
import {DisplayUserDetails} from "./DisplayUserDetails";
import {EditUserAuthority} from "./EditUserAuthority";
import {ChangeAccountLock} from "./ChangeAccountLock";


function EditUserVIew() {
    const {userId} = useParams();
    const [user, setUser] = useState<UserDetails>();
    const [authorities, setAuthorities] = useState<Authority[]>();
    const [formState] = Form.useForm();

    useEffect(() => {
        axios.get(`/users?action=single&id=${userId}`).then((e) => {
            setUser(e.data[0])
        });
        axios.get('/authorities/all').then((e) => {
            setAuthorities(e.data.filter((a: Authority) => a.authorityLevel !== 4));
        })
    }, [])

    function changeAuthority(form: any) {
        console.log(form);
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
        axios.put(`/admins/user-authority?authorityId=${form.authorityId}&userId=${userId}`).then((e) => {
            setUser(updatedUser);
            formState.setFieldsValue({'authorityId': ''})
        });
    }

    function lockAccount(e: MouseEvent<HTMLButtonElement>) {
        let name = e.currentTarget.name;
        const {...updatedUser} = user;
        updatedUser.accountNonLocked = name !== 'lock';
        axios.put(`/admins/user-account-lock?action=${name}&userId=${userId}`).then((e) => {
            setUser(updatedUser);
        });
    }

    return (
        <Row justify={'center'} className={'mt-3'}>
            <Col xs={24} sm={23} md={23} lg={14}>
                <Card title="You can ban/lock this users account or change its authority">
                    <DisplayUserDetails user={user}/>
                    <EditUserAuthority user={user} authorities={authorities} changeAuthority={changeAuthority}
                                       formState={formState}/>
                    <ChangeAccountLock user={user} lockAccount={lockAccount}/>
                </Card>
            </Col>
        </Row>
    )
}

export {EditUserVIew}
