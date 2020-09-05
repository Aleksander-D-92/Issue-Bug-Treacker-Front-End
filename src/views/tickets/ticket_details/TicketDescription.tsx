import React from "react";
import {TicketDetails} from "../../shared/Interfaces";
import {Card, Descriptions} from "antd";
import {formatDate} from "../../shared/functions";

interface Props {
    ticket?: TicketDetails
}

function TicketDescription(props: Props) {
    return (
        <Card title="Ticket Details" className={'mt-3'}>
            <Descriptions bordered>
                <Descriptions.Item label="Title" span={2}>{props.ticket?.title}</Descriptions.Item>
                <Descriptions.Item label="Description"
                                   span={2}>{props.ticket?.description}</Descriptions.Item>
                <Descriptions.Item label="Priority" span={2}>{props.ticket?.priority}</Descriptions.Item>
                <Descriptions.Item label="Category" span={2}>{props.ticket?.category}</Descriptions.Item>
                <Descriptions.Item label="Status" span={2}>{props.ticket?.status}</Descriptions.Item>
                <Descriptions.Item label="Creating Date"
                                   span={2}>{formatDate(props.ticket?.creationDate)}</Descriptions.Item>
                <Descriptions.Item label="Submitter"
                                   span={2}>{props.ticket?.submitter.username}</Descriptions.Item>
                <Descriptions.Item label="Assigned Developer"
                                   span={2}>{props.ticket?.assignedDeveloper.username}</Descriptions.Item>
            </Descriptions>
        </Card>
    )
}

export {TicketDescription}
