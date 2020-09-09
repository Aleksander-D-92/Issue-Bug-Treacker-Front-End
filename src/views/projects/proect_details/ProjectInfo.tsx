import React from "react";
import {ProjectDetails} from "../../shared/Interfaces";
import {Descriptions} from "antd";
import {capitalizeString, formatDate} from "../../shared/functions";

interface Props {
    project?: ProjectDetails,
    totalTickets?: number,
    totalQa?: number
}

function ProjectInfo(props: Props) {
    return (
        <React.Fragment>
                <Descriptions bordered={true} title="Project Details">
                    <Descriptions.Item label="Id" span={2}>{props.project?.projectId}</Descriptions.Item>
                    <Descriptions.Item label="Title" span={2}>{props.project?.title}</Descriptions.Item>
                    <Descriptions.Item label="Description"
                                       span={2}>{props.project?.description}</Descriptions.Item>
                    <Descriptions.Item label="Creation Date"
                                       span={2}>{formatDate(props.project?.creationDate)}</Descriptions.Item>
                    <Descriptions.Item label="Project Manager Username" span={2}>
                        Username: {capitalizeString(props.project?.projectManager.username)} <br/>
                    </Descriptions.Item>
                    <Descriptions.Item label="Project Manager Rgistration Date" span={2}>
                        Registration Date : {formatDate(props.project?.projectManager.registrationDate)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total tickets" span={2}>
                        {props.totalTickets}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total assigned QA" span={2}>
                        {props.totalQa}
                    </Descriptions.Item>
                </Descriptions>
        </React.Fragment>
    )
}

export {ProjectInfo}
