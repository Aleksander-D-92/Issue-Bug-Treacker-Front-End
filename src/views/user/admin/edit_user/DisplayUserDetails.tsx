import React from "react";
import {UserDetails} from "../../../shared/Interfaces";
import {Descriptions} from "antd";
import {formatDate} from "../../../shared/functions";
import {LoadingSpinner} from "../../../projects/proect_details/ProjectInfo";

interface Props {
    user?: UserDetails,
    userLoading: boolean
}

function DisplayUserDetails(props: Props) {
    return (
        <Descriptions title={`Account Details for ${props.user?.username}`} bordered={true}>
            <Descriptions.Item label="Id" span={2}>{props.user?.userId}
                <LoadingSpinner description={'Wait while we fetch the users data'} loading={props.userLoading}/>
            </Descriptions.Item>
            <Descriptions.Item label="Registration date" span={2}>{formatDate(props.user?.registrationDate)}
                <LoadingSpinner description={'Wait while we fetch the users data'} loading={props.userLoading}/>
            </Descriptions.Item>
            <Descriptions.Item label="Authority" span={2}>{props.user?.authority.authority}
                <LoadingSpinner description={'Wait while we fetch the users data'} loading={props.userLoading}/>
            </Descriptions.Item>
            <Descriptions.Item label="Authority level" span={2}>{props.user?.authority.authorityLevel}
                <LoadingSpinner description={'Wait while we fetch the users data'} loading={props.userLoading}/>
            </Descriptions.Item>
            <Descriptions.Item label="Is account Locked"
                               span={3}>{props.user?.accountNonLocked ? 'Non locked' : 'Locked'}
                <LoadingSpinner description={'Wait while we fetch the users data'} loading={props.userLoading}/>
            </Descriptions.Item>
        </Descriptions>
    )
}

export {DisplayUserDetails}
