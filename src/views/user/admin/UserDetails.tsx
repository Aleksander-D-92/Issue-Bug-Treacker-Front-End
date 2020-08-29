import React, {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Button, Card, Col, Descriptions, Divider, Row, Select} from "antd";
import {DownloadOutlined} from '@ant-design/icons';
import {formatDate} from "../../shared/functions";
import {AuthorityViewModel, UserViewModel} from "../../shared/Interfaces";


const {Option} = Select;

function UserDetails() {
    const {userId} = useParams();
    const [user, setUser] = useState<UserViewModel>();
    const [authorities, setAuthorities] = useState<AuthorityViewModel[]>();
    const [selectedAuthorityId, setSelectedAuthorityId] = useState<number>();
    const reduxState = useSelector((state: ReduxState) => state);

    useEffect(() => {
        axios.get(`/users?action=single&id=${userId}`, {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            setUser(e.data[0])
        });
        axios.get('/authorities/all', {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            setAuthorities(e.data);
        })
    }, [])

    function changeAuthority() {
        axios.put(`/admins/authority/${userId}`, {authorityId: selectedAuthorityId}, {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            console.log(e);
        });
    }

    function lockAccount() {
        axios.put(`/admins/lock-account/${userId}`).then((e) => {
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
                                           span={3}>{user?.accountNonLocked ? 'Not locked' : 'Locked'}</Descriptions.Item>
                    </Descriptions>
                    <Divider>Change authority</Divider>
                    <Select defaultValue={1} allowClear
                            onChange={(value: number) => setSelectedAuthorityId(value)} style={{width: 400}}>
                        {authorities?.map((authority) => {
                            return <Option key={authority.id} value={authority.id}>{authority.authority} =
                                Level {authority.authorityLevel}</Option>
                        })}
                    </Select>
                    <Button type="primary" icon={<DownloadOutlined/>} size={'large'} onClick={changeAuthority}
                            block={true}
                            className={'mt-2'}>
                        Change authority
                    </Button>
                    <Divider>Lock account</Divider>
                    <Button type={'primary'} danger={true} icon={<DownloadOutlined/>} size={'large'}
                            onClick={lockAccount}
                            block={true} className={'mt-2'}>
                        Lock/Ban account
                    </Button>
                </Card>
            </Col>
        </Row>
    )
}

export {UserDetails}
