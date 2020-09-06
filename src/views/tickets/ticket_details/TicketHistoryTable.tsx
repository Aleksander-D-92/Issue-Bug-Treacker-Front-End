import React from "react";
import {HistoryDetails} from "../../shared/Interfaces";
import {Table, Tag} from "antd";
import {solidColors} from "../../shared/gobalVariables";
import {formatDate} from "../../shared/functions";

interface Props {
    history: HistoryDetails[]
}

function TicketHistoryTable(props: Props) {
    function ticketTagColor(val: string): string {
        switch (val) {
            case 'LOW':
            case 'FEATURE_REQUEST':
            case 'RESOLVED':
                return solidColors.green
            case 'MEDIUM':
            case 'OTHER':
            case 'IN_PROGRESS':
                return solidColors.yellow
            case 'HIGH':
                return solidColors.orange
            case 'URGENT':
            case 'BUGS_AND_ERRORS':
            case 'UNASSIGNED':
                return solidColors.red
            default:
                return '#8884d8'
        }
    }

    const columns = [
        {
            key: 'historyId',
            title: 'Title',
            dataIndex: 'title',
        },
        {
            key: 'historyId',
            title: 'Description',
            dataIndex: 'description',
        },
        {
            key: 'historyId',
            title: 'Category',
            dataIndex: 'category',
            render: (category: string) => <Tag color={ticketTagColor(category)}>{category}</Tag>
        },
        {
            key: 'historyId',
            title: 'Priority',
            dataIndex: 'priority',
            render: (priority: string) => <Tag color={ticketTagColor(priority)}>{priority}</Tag>
        },
        {
            key: 'historyId',
            title: 'Status',
            dataIndex: 'status',
            render: (status: string) => <Tag color={ticketTagColor(status)}>{status}</Tag>
        },
        {
            key: 'historyId',
            title: 'Date of change',
            dataIndex: 'dateOfChange',
            render: (date: Date) => formatDate(date)
        },
        {
            key: 'historyId',
            title: 'Assigned Developer',
            dataIndex: ['assignedDeveloper', 'username'],
        },

    ]
    return (
        <React.Fragment>
            // @ts-ignore
            <Table columns={columns}
                   dataSource={props.history}
                   pagination={{total: props.history.length}}/>
        </React.Fragment>
    )
}

export {TicketHistoryTable}
