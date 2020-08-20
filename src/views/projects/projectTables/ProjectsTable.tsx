import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import axios from 'axios'
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Table} from "antd";
import {getProjectTableColumns, Project} from "./TableVariables";


function ProjectsTable() {
    const [projects, modifyTable] = useState<Project[]>();
    const state = useSelector(((state: ReduxState) => state));
    useEffect(() => {
        axios.get('/projects/get-all-projects', {
            headers: {
                Authorization: state.userDetails.authorizationHeader
            }
        }).then((e) => {
            modifyTable(e.data);
        })
    }, [])

    return (
        <Table dataSource={projects} columns={getProjectTableColumns('details')} bordered={true}/>
    )
}

export {ProjectsTable}
