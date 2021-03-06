import React from "react";
import {TicketDetails} from "../../shared/Interfaces";
import {Card, Descriptions, Typography} from "antd";
import {formatDate} from "../../shared/functions";
import {LoadingSpinner} from "../../shared/LoadingAnimations";

const {Text} = Typography;

interface Props {
    ticket?: TicketDetails
}

function TicketDescription(props: Props) {
    const description = 'Please wait while we fetch the ticket data';
    return (
        <Card title={<Text style={{fontWeight: 'bold', fontSize: '1.1rem'}}>Ticket Details</Text>} className={'mt-3'}>
            <Descriptions bordered>
                <Descriptions.Item label="Title" span={2}>
                    {props.ticket?.title}
                    <LoadingSpinner loading={props.ticket === undefined}
                                    description={description}/>
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>
                    {props.ticket?.description}
                    <LoadingSpinner loading={props.ticket === undefined}
                                    description={description}/>
                </Descriptions.Item>
                <Descriptions.Item label="Priority" span={2}>
                    {props.ticket?.priority}
                    <LoadingSpinner loading={props.ticket === undefined}
                                    description={description}/>
                </Descriptions.Item>
                <Descriptions.Item label="Category" span={2}>
                    {props.ticket?.category}
                    <LoadingSpinner loading={props.ticket === undefined}
                                    description={description}/>
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={2}>
                    {props.ticket?.status}
                    <LoadingSpinner loading={props.ticket === undefined}
                                    description={description}/>
                </Descriptions.Item>
                <Descriptions.Item label="Creating Date" span={2}>
                    {formatDate(props.ticket?.creationDate)}
                    <LoadingSpinner loading={props.ticket === undefined}
                                    description={description}/>
                </Descriptions.Item>
                <Descriptions.Item label="Submitter" span={2}>
                    {props.ticket?.submitter.username}
                    <LoadingSpinner loading={props.ticket === undefined}
                                    description={description}/>
                </Descriptions.Item>
                <Descriptions.Item label="Assigned Developer" span={2}>
                    {(props.ticket?.assignedDeveloper !== null) ? props.ticket?.assignedDeveloper.username : ''}
                    <LoadingSpinner loading={props.ticket === undefined}
                                    description={description}/>
                </Descriptions.Item>
            </Descriptions>
        </Card>
    )
}

export {TicketDescription}
