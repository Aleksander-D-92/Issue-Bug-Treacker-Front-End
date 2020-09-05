import React from "react";
import {ProjectDetails} from "../../shared/Interfaces";
import {Card, Descriptions} from "antd";
import {capitalizeString, formatDate} from "../../shared/functions";

interface Props {
    projects?: ProjectDetails[],
    totalTickets?: number,
    totalQa?: number
}

function ProjectInfo(props: Props) {
    return (
        <React.Fragment>
            <Card className={'mt-3'}>
                <Descriptions bordered={true} title="Project Details">
                    <Descriptions.Item label="Id" span={2}>{props.projects?.[0].projectId}</Descriptions.Item>
                    <Descriptions.Item label="Title" span={2}>{props.projects?.[0].title}</Descriptions.Item>
                    <Descriptions.Item label="Description"
                                       span={2}>{props.projects?.[0].description}</Descriptions.Item>
                    <Descriptions.Item label="Creation Date"
                                       span={2}>{formatDate(props.projects?.[0].creationDate)}</Descriptions.Item>
                    <Descriptions.Item label="Project Manager Username" span={2}>
                        Username: {capitalizeString(props.projects?.[0].projectManager.username)} <br/>
                    </Descriptions.Item>
                    <Descriptions.Item label="Project Manager Rgistration Date" span={2}>
                        Registration Date : {formatDate(props.projects?.[0].projectManager.registrationDate)}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total tickets" span={2}>
                        {props.totalQa}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total assigned QA" span={2}>
                        {props.totalTickets}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
        </React.Fragment>
    )
}

export {ProjectInfo}
