import React from "react";
import {UserDetails} from "../../../shared/Interfaces";
import {Descriptions} from "antd";
import {formatDate} from "../../../shared/functions";

interface Props {
    user?: UserDetails
}

function DisplayUserDetails(props: Props) {
    return (
        <Descriptions title={`Account Details for ${props.user?.username}`} bordered={true}>
            <Descriptions.Item label="Id" span={2}>{props.user?.userId}</Descriptions.Item>
            <Descriptions.Item label="Registration date"
                               span={2}>{formatDate(props.user?.registrationDate)}</Descriptions.Item>
            <Descriptions.Item label="Authority"
                               span={2}>{props.user?.authority.authority}</Descriptions.Item>
            <Descriptions.Item label="Authority level"
                               span={2}>{props.user?.authority.authorityLevel}</Descriptions.Item>
            <Descriptions.Item label="Is account Locked"
                               span={3}>{props.user?.accountNonLocked ? 'Non locked' : 'Locked'}</Descriptions.Item>
        </Descriptions>
    )
}

export {DisplayUserDetails}
