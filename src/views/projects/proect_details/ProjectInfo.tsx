import React from "react";
import {ProjectDetails} from "../../shared/Interfaces";
import {Descriptions, Row, Skeleton, Spin} from "antd";
import {capitalizeString, formatDate} from "../../shared/functions";

interface Props {
    project?: ProjectDetails,
    totalTickets?: number,
    totalQa?: number,
    projectLoading: boolean,
    ticketsLoading: boolean,
    assignedQaLoading: boolean,
}

function ProjectInfo(props: Props) {
    return (
        <React.Fragment>
            <Descriptions bordered={true} title="Project Details">
                <Descriptions.Item label="Id" span={2}>{props.project?.projectId}
                    {loadingAnimation(props.projectLoading, `Project data is being fetched`)}
                </Descriptions.Item>
                <Descriptions.Item label="Title" span={2}>{props.project?.title}
                    {loadingAnimation(props.projectLoading, `Project data is being fetched`)}
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>{props.project?.description}
                    {loadingAnimation(props.projectLoading, `Project data is being fetched`)}
                </Descriptions.Item>
                <Descriptions.Item label="Creation Date" span={2}>{formatDate(props.project?.creationDate)}
                    {loadingAnimation(props.projectLoading, `Project data is being fetched`)}
                </Descriptions.Item>
                <Descriptions.Item label="Project Manager Username" span={2}>
                    {loadingAnimation(props.projectLoading, `Project data is being fetched`)}
                    {capitalizeString(props.project?.projectManager.username)}
                </Descriptions.Item>
                <Descriptions.Item label="Project Manager Rgistration Date" span={2}>
                    {loadingAnimation(props.projectLoading, `Project data is being fetched`)}
                    {formatDate(props.project?.projectManager.registrationDate)}
                </Descriptions.Item>
                <Descriptions.Item label="Total tickets" span={2}>
                    {loadingAnimation(props.ticketsLoading, `Tickets data is being fetched`)}
                    {props.totalTickets}
                </Descriptions.Item>
                <Descriptions.Item label="Total assigned QA" span={2}>
                    {loadingAnimation(props.assignedQaLoading, `Qa data is being fetched`)}
                    {props.totalQa}
                </Descriptions.Item>
            </Descriptions>
        </React.Fragment>
    )
}

function loadingAnimation(loading: boolean, description: string) {
    return <Row justify={'center'}>
        <Spin size="large"
              tip={`${description}`}
              style={{fontSize: '1rem', display: (loading) ? '' : 'none'}}/>
    </Row>
}

export {ProjectInfo}
