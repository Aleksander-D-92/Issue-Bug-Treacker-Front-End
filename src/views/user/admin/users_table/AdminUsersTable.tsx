import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Row, Table} from "antd";
import {usersTableColumns} from "./variables";
import {UserDetails} from "../../../shared/Interfaces";
import {getLocale} from "../../../shared/GetLocale";
import {motion} from "framer-motion";
import {routerVariant} from "../../../shared/gobalVariables";


function AdminUsersTable() {
    const [allUsers, setAllUsers] = useState<UserDetails[]>([]);
    useEffect(() => {
        axios.get('/users?action=all').then((e) => {
            setAllUsers(e.data);
        })
    }, [])


    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <Row justify={'center'} className={'mt-3'}>
                <Col xs={24} sm={23} md={23} lg={23}>
                    <Table locale={getLocale('users')}
                           dataSource={allUsers}
                           columns={usersTableColumns}
                           pagination={{total: allUsers.length}}
                           scroll={{x: 1000}}
                           bordered={true}/>
                </Col>
            </Row>
        </motion.div>
    )
}

export {AdminUsersTable}
