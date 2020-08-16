import {Link} from "react-router-dom";
import React from "react";

export interface Authority {
    id: number,
    authority: string,
    authorityLevel: number
}

export interface User {
    id: number,
    username: string
    authority: Authority
}

const usersTableColumns = [
    {
        title: 'User ID', // kak se kazva kolonata (table HEADER)
        dataIndex: 'id', // koi key ot jsno array da sloja tuka
        key: 'id',
        sorter: {
            compare: (a: User, b: User) => a.id - b.id,
            multiple: 1
        }
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'id',
        sorter: {
            compare: (a: User, b: User) => a.username.localeCompare(b.username),
            multiple: 1
        }
    },
    {
        title: 'Authority',
        dataIndex: ['authority', 'authority'],
        key: 'id',
        sorter: {
            compare: (a: User, b: User) => a.authority.authority.localeCompare(b.authority.authority),
            multiple: 1
        }
    },
    {
        title: 'Authority Level',
        dataIndex: ['authority', 'authorityLevel'],
        key: 'id',
        sorter: {
            compare: (a: User, b: User) => a.authority.authorityLevel - b.authority.authorityLevel,
            multiple: 1
        }
    },
    {
        title: 'Edit User',
        dataIndex: 'id',
        key: 'id',
        // @ts-ignore
        render: text => <Link to={`/admins/get-user-details-by-id/${text}`}>Edit this user</Link>,
    }
];

export {usersTableColumns};
