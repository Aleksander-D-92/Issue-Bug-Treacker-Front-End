import React, {useEffect, useState} from "react";
import {UserDetails} from "../../../shared/Interfaces";
import {Descriptions} from "antd";
import {capitalizeString, formatDate} from "../../../shared/functions";
import {LoadingSpinner} from "../../../shared/LoadingAnimations";


interface Props {
    user?: UserDetails,
}

function DisplayUserDetails(props: Props) {
    const [accountLocked, setAccountLocked] = useState<string>('');
    useEffect(() => {
        if (props.user !== undefined && props.user.accountNonLocked) {
            setAccountLocked('Non locked');
        }
        if (props.user !== undefined && !props.user.accountNonLocked) {
            setAccountLocked('Locked');
        }
    }, [props.user])
    return (
        <Descriptions title={`Account Details for the current user`} bordered={true}>
            <Descriptions.Item label="Username" span={2}>{capitalizeString(props.user?.username)}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.user === undefined}/>
            </Descriptions.Item>
            <Descriptions.Item label="Id" span={2}>{props.user?.userId}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.user === undefined}/>
            </Descriptions.Item>
            <Descriptions.Item label="Registration date" span={2}>{formatDate(props.user?.registrationDate)}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.user === undefined}/>
            </Descriptions.Item>
            <Descriptions.Item label="Authority" span={2}>{props.user?.authority.authority}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.user === undefined}/>
            </Descriptions.Item>
            <Descriptions.Item label="Authority level" span={2}>{props.user?.authority.authorityLevel}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.user === undefined}/>
            </Descriptions.Item>
            <Descriptions.Item label="Is account Locked"
                               span={3}>
                {accountLocked}
                <LoadingSpinner description={'Please while we fetch your data'} loading={props.user === undefined}/>
            </Descriptions.Item>
        </Descriptions>
    )
}

export {DisplayUserDetails}
