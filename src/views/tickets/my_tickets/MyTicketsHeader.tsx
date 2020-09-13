import React, {useEffect, useState} from "react";
import {Typography} from 'antd';

const {Title} = Typography;

interface Props {
    username: string,
    authority: string

}

function TicketsGreeting(props: Props) {
    const [header, setHeader] = useState<string>()
    useEffect(() => {
        switch (props.authority) {
            case 'ROLE_PROJECT_MANAGER':
                setHeader('This is are all of the tickets across all of your projects')
                break;
            case 'ROLE_DEVELOPER':
                setHeader('This are all the tickets you are assigned to')
                break
            case 'ROLE_QA':
                setHeader('This are all the tickets you have submitted so far')
                break;
            case 'ROLE_ADMIN':
                setHeader('This are all of the tickets you have submitted')
                break;
        }
    }, [props.authority])
    return (
        <Title level={2}>{header}</Title>
    )
}

export {TicketsGreeting}
