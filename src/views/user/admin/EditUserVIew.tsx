import React, {useEffect, useState, MouseEvent} from "react";
import axios from "axios";
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Button, Card, Col, Descriptions, Divider, Form, Input, Row, Select} from "antd";
import {DownloadOutlined} from '@ant-design/icons';
import {formatDate} from "../../shared/functions";
import {AuthorityViewModel, UserViewModel} from "../../shared/Interfaces";


const {Option} = Select;

function EditUserVIew() {
    const {userId} = useParams();
    const [user, setUser] = useState<UserViewModel>();
    const [accountNonLocked, setAccountNonLocked] = useState<boolean>()
    const [authorities, setAuthorities] = useState<AuthorityViewModel[]>();
    const reduxState = useSelector((state: ReduxState) => state);

    useEffect(() => {
        axios.get(`/users?action=single&id=${userId}`, {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            setUser(e.data[0])
            setAccountNonLocked(e.data[0].accountNonLocked)
        });
        axios.get('/authorities/all', {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            setAuthorities(e.data);
        })
    }, [])

    function changeAuthority(form: any) {
        axios.put(`/admins/user-authority?userId=${userId}&authorityId=${form.authority}`, {}, {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
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
        axios.put(`/admins/user-account-lock?action=${name}&userId=${userId}`, {}, {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            console.log(e);
        });
    }

    return (
        <Row justify={'center'} className={'mt-3'}>
            <Col xs={24} sm={22} md={22} lg={14}>
                <Card title="You can ban/lock account or change their authority">
                    <Descriptions title={`Account Details for ${user?.username}`} bordered={true}>
                        <Descriptions.Item label="Id" span={2}>{user?.id}</Descriptions.Item>
                        <Descriptions.Item label="Registration date"
                                           span={2}>{formatDate(user?.registrationDate)}</Descriptions.Item>
                        <Descriptions.Item label="Authority"
                                           span={2}>{user?.authority.authority}</Descriptions.Item>
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
                                    return <Option key={authority.id} value={authority.id}>{authority.authority} =
                                        Level {authority.authorityLevel}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Button type="primary" icon={<DownloadOutlined/>} size={'large'}
                                block={true} htmlType={'submit'}
                                className="login-form-button">
                            Change authority
                        </Button>
                    </Form>
                    <Divider>Set account lock</Divider>
                    <Button type={'primary'} danger={true} icon={<DownloadOutlined/>} size={'large'}
                            onClick={lockAccount}
                            block={true} className={'mt-2'}
                            name={'lock'}
                            disabled={!accountNonLocked}>
                        Lock account
                    </Button>
                    <Button type={'primary'} icon={<DownloadOutlined/>} size={'large'}
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
