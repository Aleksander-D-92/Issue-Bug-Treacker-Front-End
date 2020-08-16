import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import axios from "axios";
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {Table} from "antd";
import {usersTableColumns, User} from "./variables";


function AdminPage() {
    const [userTable, modifyTable] = useState<User[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    let reduxState = useSelector((state: ReduxState) => state);
    useEffect(() => {
        axios.get('/admins/get-all-users/-1', {
            headers: {
                Authorization: reduxState.userDetails.authorizationHeader
            }
        }).then((e) => {
            let arr: Array<User> = [];
            for (let i = 0; i < 20; i++) {
                e.data.users.forEach((e: User) => {
                    arr.push(e);
                });
            }
            modifyTable(arr);
            setTotalPages(e.data.totalCount);
        }).catch((e) => {
            console.log(e);
        })
    }, [])


    return (
        <div>
            <Table dataSource={userTable} columns={usersTableColumns} bordered={true}/>
        </div>
    )
}

export {AdminPage}
