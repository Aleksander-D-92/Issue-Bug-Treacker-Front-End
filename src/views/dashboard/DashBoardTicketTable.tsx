import React from "react";
import {TicketDetails} from "../shared/Interfaces";
import {Table, Tag} from "antd";
import {compareDates, formatDate} from "../shared/functions";
import {Link} from "react-router-dom";
import {solidColors} from "../shared/gobalVariables";
import {loadingLocale, noDataLocale} from "../shared/LoadingLocale";

interface Props {
    tickets?: TicketDetails[],
    ticketsLoading: boolean
}

function DashBoardTicketTable(props: Props) {
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
            key: 'ticketId',
            title: 'Title',
            dataIndex: 'title',
            sorter: {
                compare: (a: TicketDetails, b: TicketDetails) => a.title.localeCompare(b.title),
                multiple: 1
            }
        },
        {
            key: 'ticketId',
            title: 'Priority',
            dataIndex: 'priority',
            render: (priority: string) => <Tag color={ticketTagColor(priority)}>{priority}</Tag>,
            sorter: {
                compare: (a: TicketDetails, b: TicketDetails) => a.priority.localeCompare(b.priority),
                multiple: 2
            }
        },
        {
            key: 'ticketId',
            title: 'Category',
            dataIndex: 'category',
            render: (category: string) => <Tag color={ticketTagColor(category)}>{category}</Tag>,
            sorter: {
                compare: (a: TicketDetails, b: TicketDetails) => a.category.localeCompare(b.category),
                multiple: 3
            }
        },
        {
            key: 'ticketId',
            title: 'Status',
            dataIndex: 'status',
            render: (status: string) => <Tag color={ticketTagColor(status)}>{status}</Tag>,
            sorter: {
                compare: (a: TicketDetails, b: TicketDetails) => a.status.localeCompare(b.status),
                multiple: 4
            }
        },
        {
            key: 'ticketId',
            title: 'Project Title',
            dataIndex: ['project', 'title'],
            sorter: {
                compare: (a: TicketDetails, b: TicketDetails) => a.project.title.localeCompare(b.project.title),
                multiple: 5
            }
        },
        {
            key: 'ticketId',
            title: 'Created nn',
            dataIndex: 'creationDate',
            render: (date: Date) => formatDate(date),
            sorter: {
                compare: (a: TicketDetails, b: TicketDetails) => compareDates(a.creationDate, b.creationDate),
                multiple: 6
            },
        },
        {
            key: 'ticketId',
            title: 'Assigned Developer',
            dataIndex: ['assignedDeveloper', 'username'],
            sorter: {
                compare: (a: TicketDetails, b: TicketDetails) => {
                    if (a.assignedDeveloper === null && b.assignedDeveloper === null) {
                        return 0;
                    }
                    if (a.assignedDeveloper?.username === null) {
                        return 1;
                    }
                    if (b.assignedDeveloper?.username === null) {
                        return -1;
                    }
                    if (a.assignedDeveloper !== null && b.assignedDeveloper !== null) {
                        return a.assignedDeveloper?.username.localeCompare(b.assignedDeveloper?.username);
                    }
                },
                multiple: 7
            }
        },
        {
            key: 'ticketId',
            title: 'Details',
            dataIndex: 'ticketId',
            render: (ticketId: number) => <Link to={`/tickets/details/${ticketId}`}>Details</Link>,
        }

    ]

    return (
        <React.Fragment>
            // @ts-ignore
            <Table columns={columns}
                   locale={(props.tickets?.length === 0) ? noDataLocale('tickets') : loadingLocale('tickets')}
                   dataSource={props.tickets}
                   bordered
                   pagination={{total: props.tickets?.length}} className={'mt-3'}
                   scroll={{x: 1000}}/>}
        </React.Fragment>
    )
}

export {DashBoardTicketTable}
