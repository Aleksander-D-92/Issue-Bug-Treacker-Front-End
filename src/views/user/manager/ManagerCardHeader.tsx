import React from "react";
import {Typography} from 'antd';

const {Title} = Typography;

function ManagerCardHeader() {
    return (
        <React.Fragment>
            <Title level={3}>You can create a QA or Developer accounts that can work for you</Title>
            <ul>
                <li>You can assign the QA to you projects</li>
                <li>You can assign the Developers to you tickets</li>
            </ul>
        </React.Fragment>
    )
}
export {ManagerCardHeader}
