import {Link} from "react-router-dom";
import React from "react";
import {UserDetails} from "../../../shared/Interfaces";
import {compareDates, formatDate} from "../../../shared/functions";


const usersTableColumns = [
    {
        title: 'User ID', // kak se kazva kolonata (table HEADER)
        dataIndex: 'userId', // koi key ot jsno array da sloja tuka
        key: 'userId',
        sorter: {
            compare: (a: UserDetails, b: UserDetails) => a.userId - b.userId,
            multiple: 1
        }
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'userId',
        sorter: {
            compare: (a: UserDetails, b: UserDetails) => a.username.localeCompare(b.username),
            multiple: 1
        }
    },
    {
        title: 'Registration Date',
        dataIndex: 'registrationDate',
        key: 'userId',
        render: (text: Date) => formatDate(text),
        sorter: {
            compare: (a: UserDetails, b: UserDetails) => compareDates(a.registrationDate, b.registrationDate),
            multiple: 1
        }
    },
    {
        title: 'Authority',
        dataIndex: ['authority', 'authority'],
        key: 'userId',
        sorter: {
            compare: (a: UserDetails, b: UserDetails) => a.authority.authority.localeCompare(b.authority.authority),
            multiple: 1
        }
    },
    {
        title: 'Authority Level',
        dataIndex: ['authority', 'authorityLevel'],
        key: 'userId',
        sorter: {
            compare: (a: UserDetails, b: UserDetails) => a.authority.authorityLevel - b.authority.authorityLevel,
            multiple: 1
        }
    },
    {
        title: 'Is account lock',
        dataIndex: 'accountNonLocked',
        key: 'userId',
        render: (text: boolean) => {
            if (text) {
                return 'not locked'
            }
            return 'locked'
        },
        sorter: {
            compare: (a: UserDetails, b: UserDetails) => booleanCompare(a.accountNonLocked, b.accountNonLocked),
            multiple: 1
        }
    },
    {
        title: 'Edit User',
        dataIndex: 'userId',
        key: 'userId',
        render: (text: number) => <Link to={`/admins/edit-user/${text}`}>Edit this user</Link>,
    }
];

function booleanCompare(a: boolean, b: boolean): number {
    if (a && !b) {
        return 1
    } else if (!a && b) {
        return -1
    }
    return 0
}

export {usersTableColumns};
