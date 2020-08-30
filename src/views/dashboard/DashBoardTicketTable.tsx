import React from "react";
import {TicketViewModel} from "../shared/Interfaces";
import {Col, Row, Table, Tag} from "antd";
import {compareDates, formatDate} from "../shared/functions";

interface Props {
    tickets?: TicketViewModel[]
}

function DashBoardTicketTable(props: Props) {
    function getTagColor(val: string) {
        switch (val) {
            case 'LOW':
            case 'FEATURE_REQUEST':
            case 'RESOLVED':
                return '#00C49F'
            case 'MEDIUM':
            case 'OTHER':
            case 'IN_PROGRESS':
                return '#FFBB28'
            case 'HIGH':
                return '#FF8042'
            case 'URGENT':
            case 'BUGS_AND_ERRORS':
            case 'UNASSIGNED':
                return '#ff4242'
            default:
                return '#8884d8'
        }
    }

    const columns = [
        {
            key: 'id',
            title: 'Title',
            dataIndex: 'title',
            sorter: {
                compare: (a: TicketViewModel, b: TicketViewModel) => a.title.localeCompare(b.title),
                multiple: 1
            }
        },
        {
            key: 'id',
            title: 'Priority',
            dataIndex: 'priority',
            render: (priority: string) => <Tag color={getTagColor(priority)}>{priority}</Tag>,
            sorter: {
                compare: (a: TicketViewModel, b: TicketViewModel) => a.priority.localeCompare(b.priority),
                multiple: 1
            }
        },
        {
            key: 'id',
            title: 'Category',
            dataIndex: 'category',
            render: (category: string) => <Tag color={getTagColor(category)}>{category}</Tag>,
            sorter: {
                compare: (a: TicketViewModel, b: TicketViewModel) => a.category.localeCompare(b.category),
                multiple: 1
            }
        },
        {
            key: 'id',
            title: 'Status',
            dataIndex: 'status',
            render: (status: string) => <Tag color={getTagColor(status)}>{status}</Tag>,
            sorter: {
                compare: (a: TicketViewModel, b: TicketViewModel) => a.status.localeCompare(b.status),
                multiple: 1
            }
        },
        {
            key: 'id',
            title: 'Project Title',
            dataIndex: 'projectTitle',
            sorter: {
                compare: (a: TicketViewModel, b: TicketViewModel) => a.projectTitle.localeCompare(b.projectTitle),
                multiple: 1
            }
        },
        {
            key: 'id',
            title: 'Created nn',
            dataIndex: 'creationDate',
            render: (date: Date) => formatDate(date),
            sorter: {
                compare: (a: TicketViewModel, b: TicketViewModel) => compareDates(a.creationDate, b.creationDate),
                multiple: 1
            },
        },
        {
            key: 'id',
            title: 'Assigned Developer',
            dataIndex: 'assignedDeveloperName',
            sorter: {
                compare: (a: TicketViewModel, b: TicketViewModel) => {
                    if (a.assignedDeveloperName === null && b.assignedDeveloperName === null) {
                        return 0;
                    }
                    if (a.assignedDeveloperName === null) {
                        return -1;
                    }
                    if (b.assignedDeveloperName === null) {
                        return 1;
                    }
                    return a.assignedDeveloperName.localeCompare(b.assignedDeveloperName);
                },
                multiple: 1
            }
        }

    ]

    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22}>
                    <Table columns={columns} dataSource={props.tickets} bordered
                           pagination={{total: props.tickets?.length}} className={'mt-3'} scroll={{x: 1000}}/>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {DashBoardTicketTable}
