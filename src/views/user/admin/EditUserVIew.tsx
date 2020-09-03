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
    const [accountNonLocked, setAccountNonLocked] = useState<boolean>();
    const [currentAuthority, setCurrentAuthority] = useState<string>();

    useEffect(() => {
        axios.get(`/users?action=single&id=${userId}`).then((e) => {
            setUser(e.data[0])
            setAccountNonLocked(e.data[0].accountNonLocked)
            setCurrentAuthority(e.data[0].authority.authority)
        });
        axios.get('/authorities/all').then((e) => {
            setAuthorities(e.data.filter((a: Authority) => a.authorityLevel !== 4));
        })
    }, [])

    function changeAuthority(form: any) {
        switch (form.authority) {
            case 1:
                setCurrentAuthority('ROLE_QA')
                break;
            case 2:
                setCurrentAuthority('ROLE_DEVELOPER')
                break;
            case 3:
                setCurrentAuthority('ROLE_PROJECT_MANAGER')
                break;
        }
        axios.put(`/admins/user-authority?userId=${userId}&authorityId=${form.authority}`).then((e) => {
            console.log(e);
        });
    }

    function lockAccount(e: MouseEvent<HTMLButtonElement>) {
        let name = e.currentTarget.name;
        if (name === 'lock') {
            setAccountNonLocked(false);
        } else {
            setAccountNonLocked(true)
        }
        axios.put(`/admins/user-account-lock?action=${name}&userId=${userId}`)
            .then((e) => {
                console.log(e);
            });
    }

    return (
        <Row justify={'center'} className={'mt-3'}>
            <Col xs={24} sm={22} md={22} lg={14}>
                <Card title="You can ban/lock account or change their authority">
                    <Descriptions title={`Account Details for ${user?.username}`} bordered={true}>
                        <Descriptions.Item label="Id" span={2}>{user?.userId}</Descriptions.Item>
                        <Descriptions.Item label="Registration date"
                                           span={2}>{formatDate(user?.registrationDate)}</Descriptions.Item>
                        <Descriptions.Item label="Authority"
                                           span={2}>{currentAuthority}</Descriptions.Item>
                        <Descriptions.Item label="Authority level"
                                           span={2}>{user?.authority.authorityLevel}</Descriptions.Item>
                        <Descriptions.Item label="Is account Locked"
                                           span={3}>{accountNonLocked ? 'Non locked' : 'Locked'}</Descriptions.Item>
                    </Descriptions>
                    <Divider>Change authority</Divider>
                    <Form
                        name="normal_login"
                        className="login-form"
                        layout={'vertical'}
                        onFinish={changeAuthority}>
                        <Form.Item
                            label="Authority"
                            name="authority"
                            rules={[{required: true, message: 'Must select at least one'}]}>
                            <Select defaultValue={1} allowClear style={{width: 400}}>
                                {authorities?.map((authority) => {
                                    return <Option key={authority.authorityId} value={authority.authorityId}>{authority.authority} =
                                        Level {authority.authorityLevel}</Option>
                                })}
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
                            disabled={!accountNonLocked}>
                        Lock account
                    </Button>
                    <Button type={'primary'} icon={<UnlockOutlined style={{fontSize: '1.1rem'}}/>} size={'large'}
                            onClick={lockAccount}
                            block={true} className={'mt-2'}
                            name={'unlock'}
                            disabled={!!accountNonLocked}>
                        Unlock account
                    </Button>
                </Card>
            </Col>
        </Row>
    )
}

export {EditUserVIew}
