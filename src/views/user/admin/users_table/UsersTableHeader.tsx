import React from "react";
import {Typography} from 'antd';

const {Title} = Typography;


function UsersTableHeader() {
    return (
        <Title level={3}>This are all of the users currently registered</Title>
    )
}

export {UsersTableHeader}
