import {Link} from "react-router-dom";
import React from "react";
import {UserViewModel} from "../../shared/Interfaces";
import {compareDates, formatDate} from "../../shared/functions";


const usersTableColumns = [
    {
        title: 'User ID', // kak se kazva kolonata (table HEADER)
        dataIndex: 'id', // koi key ot jsno array da sloja tuka
        key: 'id',
        sorter: {
            compare: (a: UserViewModel, b: UserViewModel) => a.id - b.id,
            multiple: 1
        }
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'id',
        sorter: {
            compare: (a: UserViewModel, b: UserViewModel) => a.username.localeCompare(b.username),
            multiple: 1
        }
    },
    {
        title: 'Registration Date',
        dataIndex: 'registrationDate',
        key: 'id',
        render: (text: Date) => formatDate(text),
        sorter: {
            compare: (a: UserViewModel, b: UserViewModel) => compareDates(a.registrationDate, b.registrationDate),
            multiple: 1
        }
    },
    {
        title: 'Authority',
        dataIndex: ['authority', 'authority'],
        key: 'id',
        sorter: {
            compare: (a: UserViewModel, b: UserViewModel) => a.authority.authority.localeCompare(b.authority.authority),
            multiple: 1
        }
    },
    {
        title: 'Authority Level',
        dataIndex: ['authority', 'authorityLevel'],
        key: 'id',
        sorter: {
            compare: (a: UserViewModel, b: UserViewModel) => a.authority.authorityLevel - b.authority.authorityLevel,
            multiple: 1
        }
    },
    {
        title: 'Is account lock',
        dataIndex: 'accountNonLocked',
        key: 'id',
        render: (text: boolean) => {
            if (text) {
                return 'not locked'
            }
            return 'locked'
        }
    },
    {
        title: 'Edit User',
        dataIndex: 'id',
        key: 'id',
        render: (text: number) => <Link to={`/admins/get-user-details-by-id/${text}`}>Edit this user</Link>,
    }
];

export {usersTableColumns};
