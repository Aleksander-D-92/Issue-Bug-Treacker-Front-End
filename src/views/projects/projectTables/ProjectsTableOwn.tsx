import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import axios from 'axios'
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Table} from "antd";
import {Project, getProjectTableColumns} from "./TableVariables";

function ProjectsTableOwn() {
    const [projects, modifyTable] = useState<Project[]>();
    const state = useSelector(((state: ReduxState) => state));

    useEffect(() => {
        const userId = state.userDetails.id;
        axios.get(`/projects/get-own-projects/${userId}`, {
            headers: {
                Authorization: state.userDetails.authorizationHeader
            }
        }).then((e) => {
            modifyTable(e.data);
        })
    }, [])
    return (
        <Table dataSource={projects} columns={getProjectTableColumns('Edit')} bordered={true}/>

    )
}

export {ProjectsTableOwn}
