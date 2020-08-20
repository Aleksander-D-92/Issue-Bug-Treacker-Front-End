import {Link} from "react-router-dom";
import React from "react";


export interface Project {
    id: number,
    title: string,
    description: string,
    ownerName: string
    creationDate: Date,
}

function getProjectTableColumns(linkName: string) {
    return [
        {
            title: 'Project Name', // kak se kazva kolonata (table HEADER)
            dataIndex: 'title', // koi key ot jsno array da sloja tuka
            key: 'id',
            sorter: {
                compare: (a: Project, b: Project) => a.title.localeCompare(b.title),
                multiple: 1
            }
        },
        {
            title: 'Description', // kak se kazva kolonata (table HEADER)
            dataIndex: 'description', // koi key ot jsno array da sloja tuka
            key: 'id',
            sorter: {
                compare: (a: Project, b: Project) => a.description.localeCompare(b.description),
                multiple: 1
            }
        },
        {
            title: 'Owner', // kak se kazva kolonata (table HEADER)
            dataIndex: 'ownerName', // koi key ot jsno array da sloja tuka
            key: 'id',
            sorter: {
                compare: (a: Project, b: Project) => a.ownerName.localeCompare(b.ownerName),
                multiple: 1
            }
        },
        {
            title: 'Created on', // kak se kazva kolonata (table HEADER)
            dataIndex: 'creationDate', // koi key ot jsno array da sloja tuka
            key: 'id',
            render: (creationDate: Date) => <span>{formatDate(creationDate.toString().substring(0, 10))}</span>,
            sorter: {
                compare: (a: Project, b: Project) => compareDates(a.creationDate, b.creationDate),
                multiple: 1
            },

        },
        {
            title: 'Details',
            dataIndex: 'id',
            key: 'id',
            render: (text: number) => <Link to={`/projects/project-details/${text}`}>{linkName}</Link>,

        }
    ];
}


function compareDates(a: Date, b: Date): number {
    if (a > b) {
        return 1;
    } else {
        return -1;
    }
}

function formatDate(date: string | undefined): string {
    if (date === undefined) {
        return '';
    }
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let strings = date.split('-').reverse();
    strings[1] = months[parseInt(strings[1]) - 1];
    return strings.join(" ").toString();
}

export {formatDate, getProjectTableColumns}
