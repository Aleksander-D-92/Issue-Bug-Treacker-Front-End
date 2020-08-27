import React, {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {Button, Card, Select} from "antd";
import {DownloadOutlined} from '@ant-design/icons';
import {formatDate} from "../shared/functions";
import {AuthorityViewModel, UserViewModel} from "../shared/Interfaces";


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
        })
    }

    return (
        <React.Fragment>
            <Card title={user?.username} extra={<a href="#">More</a>} style={{width: 300}}>
                <p>Id {user?.id}</p>
                <p>Registration date {formatDate(user?.registrationDate)}</p>
                <p>Authority {user?.authority.authority}</p>
                <p>Authority level {user?.authority.authorityLevel}</p>
                <p>Card content</p>
            </Card>
            <Select defaultValue={1} style={{width: 300}} allowClear
                    onChange={(value: number) => setSelectedAuthorityId(value)}>
                {authorities?.map((authority) => {
                    return <Option key={authority.id} value={authority.id}>{authority.authority} = Level {authority.authorityLevel}</Option>
                })}
            </Select>
            <Button type="primary" icon={<DownloadOutlined/>} size={'large'} onClick={changeAuthority}>
                Download
            </Button>
        </React.Fragment>
    )
}

export {UserDetails}
