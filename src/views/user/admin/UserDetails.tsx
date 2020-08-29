import React, {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Button, Card, Descriptions, Select} from "antd";
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
        <React.Fragment>
            <Card title="User details" style={{width: 600}}>
                <Descriptions title={`Account Details for ${user?.username}`} bordered={true}>
                    <Descriptions.Item label="Id" span={2}>{user?.id}</Descriptions.Item>
                    <Descriptions.Item label="Registration date"
                                       span={2}>{formatDate(user?.registrationDate)}</Descriptions.Item>
                    <Descriptions.Item label="Authority"
                                       span={2}>{user?.authority.authority}</Descriptions.Item>
                    <Descriptions.Item label="Authority level"
                                       span={2}>{user?.authority.authorityLevel}</Descriptions.Item>
                </Descriptions>
                <Select defaultValue={1} style={{width: 300}} allowClear
                        onChange={(value: number) => setSelectedAuthorityId(value)}>
                    {authorities?.map((authority) => {
                        return <Option key={authority.id} value={authority.id}>{authority.authority} =
                            Level {authority.authorityLevel}</Option>
                    })}
                </Select>
                <Button type="primary" icon={<DownloadOutlined/>} size={'large'} onClick={changeAuthority} block={true}>
                    Change authority
                </Button>
                <Button type={'primary'} danger={true} icon={<DownloadOutlined/>} size={'large'} onClick={lockAccount}
                        block={true}>
                    Lock/ban account
                </Button>
            </Card>
        </React.Fragment>
    )
}

export {UserDetails}
