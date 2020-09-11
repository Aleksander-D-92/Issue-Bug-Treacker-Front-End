import React from "react";
import {ProjectDetails} from "../../shared/Interfaces";
import {Descriptions} from "antd";
import {capitalizeString, formatDate} from "../../shared/functions";
import {LoadingSpinner} from "../../shared/LoadingAnimations";

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
                </Descriptions.Item>
                <Descriptions.Item label="Title" span={2}>{props.project?.title}
                    <LoadingSpinner loading={props.projectLoading} description={'Project data is being fetched'}/>
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>{props.project?.description}
                    <LoadingSpinner loading={props.projectLoading} description={'Project data is being fetched'}/>
                </Descriptions.Item>
                <Descriptions.Item label="Creation Date" span={2}>{formatDate(props.project?.creationDate)}
                    <LoadingSpinner loading={props.projectLoading} description={'Project data is being fetched'}/>
                </Descriptions.Item>
                <Descriptions.Item label="Project Manager Username" span={2}>
                    {capitalizeString(props.project?.projectManager.username)}
                    <LoadingSpinner loading={props.projectLoading} description={'Project data is being fetched'}/>
                </Descriptions.Item>
                <Descriptions.Item label="Project Manager Rgistration Date" span={2}>
                    {formatDate(props.project?.projectManager.registrationDate)}
                    <LoadingSpinner loading={props.projectLoading} description={'Project data is being fetched'}/>
                </Descriptions.Item>
                <Descriptions.Item label="Total tickets" span={2}>
                    {props.totalTickets}
                    <LoadingSpinner loading={props.ticketsLoading} description={'Project data is being fetched'}/>
                </Descriptions.Item>
                <Descriptions.Item label="Total assigned QA" span={2}>
                    {props.totalQa}
                    <LoadingSpinner loading={props.assignedQaLoading} description={'Project data is being fetched'}/>
                </Descriptions.Item>
            </Descriptions>
        </React.Fragment>
    )
}

export {ProjectInfo, LoadingSpinner}
