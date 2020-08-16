import React, {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {Authority, User} from "./variables";
import {Button, Card, Select} from "antd";
import {PoweroffOutlined, DownloadOutlined} from '@ant-design/icons';


const {Option} = Select;

function UserDetails() {
    const {userId} = useParams();
    const [user, setUserAndRole] = useState<User>();
    const [authorities, setAuthorities] = useState<Array<Authority>>();
    const [selectedAuthority, setSelectedAuthority] = useState<string>();
    const reduxState = useSelector((state: ReduxState) => state);

    useEffect(() => {

        axios.get(`/admins/get-user-details-by-id/${userId}`, {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            setUserAndRole(e.data)
        });
        axios.get('/admins/get-all-authorities', {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            setAuthorities(e.data);
        })
    }, [])

    function handleSubmit() {
        axios.put(`/admins/update-users-authority-by-id/${userId}`, {authority: selectedAuthority}, {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        })
    }

    return (
        <React.Fragment>
            <Card title={user?.username} extra={<a href="#">More</a>} style={{width: 300}}>
                <p>Id {user?.id}</p>
                <p>Authority {user?.authority.authority}</p>
                <p>Authority level {user?.authority.authorityLevel}</p>
                <p>Card content</p>
            </Card>
            <Select defaultValue="ROLE_USER" style={{width: 200}} allowClear
                    onChange={(value: string) => setSelectedAuthority(value)}>
                {authorities?.map((e) => {
                    return <Option key={e.id} value={e.authority}>{e.authority} = Level {e.authorityLevel}</Option>
                })}
            </Select>
            <Button type="primary" icon={<DownloadOutlined/>} size={'large'} onClick={handleSubmit}>
                Download
            </Button>
        </React.Fragment>
    )
}

export {UserDetails}
