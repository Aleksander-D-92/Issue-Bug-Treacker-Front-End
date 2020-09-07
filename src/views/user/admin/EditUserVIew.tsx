import React, {MouseEvent, useEffect, useState} from "react";
import axios from "axios";
import {useParams} from 'react-router-dom'
import {Button, Card, Col, Descriptions, Divider, Form, Row, Select} from "antd";
import {LockOutlined, UnlockOutlined, UserSwitchOutlined} from '@ant-design/icons';
import {formatDate} from "../../shared/functions";
import {Authority, UserDetails} from "../../shared/Interfaces";

const {Option} = Select;

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
                <Card title="You can ban/lock account or change their authority">
                    <Descriptions title={`Account Details for ${user?.username}`} bordered={true}>
                        <Descriptions.Item label="Id" span={2}>{user?.userId}</Descriptions.Item>
                        <Descriptions.Item label="Registration date"
                                           span={2}>{formatDate(user?.registrationDate)}</Descriptions.Item>
                        <Descriptions.Item label="Authority"
                                           span={2}>{user?.authority.authority}</Descriptions.Item>
                        <Descriptions.Item label="Authority level"
                                           span={2}>{user?.authority.authorityLevel}</Descriptions.Item>
                        <Descriptions.Item label="Is account Locked"
                                           span={3}>{user?.accountNonLocked ? 'Non locked' : 'Locked'}</Descriptions.Item>
                    </Descriptions>

                    <Divider>Change authority</Divider>
                    <Form
                        form={formState}
                        name="editAuthority"
                        layout={'vertical'}
                        initialValues={{}}
                        onFinish={changeAuthority}>
                        <Form.Item
                            label="Authorities"
                            name="authorityId"
                            rules={[{required: true, message: 'Must select at least one'}]}>
                            <Select allowClear style={{width: 400}}>
                                {authorities?.map((authority) =>
                                    (authority.authorityId !== user?.authority.authorityId) ?
                                        <Option value={authority.authorityId}>{authority.authority} =
                                            Level {authority.authorityLevel}</Option> : ''
                                )}
                            </Select>
                        </Form.Item>
                        <Button type="primary" icon={<UserSwitchOutlined style={{fontSize: '1.2rem'}}/>} size={'large'}
                                block={true} htmlType={'submit'}
                                className="login-form-button">
                            Change authority
                        </Button>
                    </Form>

                    <Divider>Set account lock</Divider>
                    <Button type={'primary'} danger={true} icon={<LockOutlined style={{fontSize: '1.2rem'}}/>}
                            size={'large'}
                            onClick={lockAccount}
                            block={true} className={'mt-2'}
                            name={'lock'}
                            disabled={!user?.accountNonLocked}>
                        Lock account
                    </Button>
                    <Button type={'primary'} icon={<UnlockOutlined style={{fontSize: '1.1rem'}}/>} size={'large'}
                            onClick={lockAccount}
                            block={true} className={'mt-2'}
                            name={'unlock'}
                            disabled={!!user?.accountNonLocked}>
                        Unlock account
                    </Button>
                </Card>
            </Col>
        </Row>
    )
}

export {EditUserVIew}
