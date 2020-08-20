import React, {useEffect, useState} from "react";
import axios from 'axios'
import {Link, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Divider, Table} from "antd";
import {compareDates, formatDate} from "../project-tables/TableVariables";

interface TicketView {
    id: number,
    title: string,
    projectName: string,
    assignedDeveloper: string,
    priority: string,
    category: string,
    status: string,
    creationDate: Date,
}

function TicketsForProject() {
    const state = useSelector((state: ReduxState) => state);
    const [allTickets, setTickets] = useState<TicketView[]>();
    const {projectId} = useParams();
    useEffect(() => {
        axios.get(`/tickets/get-by-project-id/${projectId}`, {
            headers: {Authorization: state.userDetails.authorizationHeader}
        }).then((e) => {
            setTickets(e.data);
        });

    }, [])


    let columns = [
        {
            title: 'Title', // kak se kazva kolonata (table HEADER)
            dataIndex: 'title', // koi key ot jsno array da sloja tuka
            key: 'id',
            sorter: {
                compare: (a: TicketView, b: TicketView) => a.title.localeCompare(b.title),
                multiple: 1
            }
        },
        {
            title: 'Priority', // kak se kazva kolonata (table HEADER)
            dataIndex: 'priority', // koi key ot jsno array da sloja tuka
            key: 'id',
            sorter: {
                compare: (a: TicketView, b: TicketView) => a.priority.localeCompare(b.priority),
                multiple: 1
            }
        },
        {
            title: 'Category', // kak se kazva kolonata (table HEADER)
            dataIndex: 'category', // koi key ot jsno array da sloja tuka
            key: 'id',
            sorter: {
                compare: (a: TicketView, b: TicketView) => a.category.localeCompare(b.category),
                multiple: 1
            }
        },
        {
            title: 'Status', // kak se kazva kolonata (table HEADER)
            dataIndex: 'status' || '', // koi key ot jsno array da sloja tuka
            key: 'id',
            sorter: {
                compare: (a: TicketView, b: TicketView) => a.status.localeCompare(b.status),
                multiple: 1
            }
        },
        {
            title: 'Creation Date', // kak se kazva kolonata (table HEADER)
            dataIndex: 'creationDate', // koi key ot jsno array da sloja tuka
            key: 'id',
            render: (creationDate: Date) => <span>{formatDate(creationDate.toString().substring(0, 10))}</span>,
            sorter: {
                compare: (a: TicketView, b: TicketView) => compareDates(a.creationDate, b.creationDate),
                multiple: 1
            },
        },
        {
            title: 'Details',
            dataIndex: 'id',
            key: 'id',
            render: (id: number) => <Link to={`/tickets/ticket-details/${id}`}>Details</Link>,

        }

    ];
    return (
        <React.Fragment>
            <Divider orientation="left">Tickets for the project</Divider>
            <Table dataSource={allTickets} columns={columns}/>
        </React.Fragment>
    )
}

export {TicketsForProject}
