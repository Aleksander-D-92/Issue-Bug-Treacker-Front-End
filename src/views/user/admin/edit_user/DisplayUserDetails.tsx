import React from "react";
import {UserDetails} from "../../../shared/Interfaces";
import {Descriptions} from "antd";
import {capitalizeString, formatDate} from "../../../shared/functions";
import {LoadingSpinner} from "../../../shared/LoadingLocale";


interface Props {
    user?: UserDetails,
    userLoading: boolean
}

function DisplayUserDetails(props: Props) {
    return (
        <Descriptions title={`Account Details for the current user`} bordered={true}>
            <Descriptions.Item label="Username" span={2}>{capitalizeString(props.user?.username)}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.userLoading}/>
            </Descriptions.Item>
            <Descriptions.Item label="Id" span={2}>{props.user?.userId}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.userLoading}/>
            </Descriptions.Item>
            <Descriptions.Item label="Registration date" span={2}>{formatDate(props.user?.registrationDate)}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.userLoading}/>
            </Descriptions.Item>
            <Descriptions.Item label="Authority" span={2}>{props.user?.authority.authority}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.userLoading}/>
            </Descriptions.Item>
            <Descriptions.Item label="Authority level" span={2}>{props.user?.authority.authorityLevel}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.userLoading}/>
            </Descriptions.Item>
            <Descriptions.Item label="Is account Locked"
                               span={3}>{props.user?.accountNonLocked ? 'Non locked' : 'Locked'}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.userLoading}/>
            </Descriptions.Item>
        </Descriptions>
    )
}

export {DisplayUserDetails}
