import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import axios from 'axios'
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {Table} from "antd";
import {Project, projectsTableColumns} from "./TableVariables";


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
        <Table dataSource={projects} columns={projectsTableColumns} bordered={true}/>
    )
}

export {ProjectsTable}
