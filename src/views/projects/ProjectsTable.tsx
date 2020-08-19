import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {Table} from "antd";
import {Link} from "react-router-dom";
import {Project, projectTableColumns} from "./TableVariables";


function ProjectsTable() {
    const [projects, modifyTable] = useState<Project[]>();
    const state = useSelector(((state: ReduxState) => state));
    useEffect(() => {
        axios.get('/projects/get-all-projects', {
            headers: {
                Authorization: state.userDetails.authorizationHeader
            }
        }).then((e) => {
            console.log(e.data);
            modifyTable(e.data);
        })
    }, [])

    return (
        <Table dataSource={projects} columns={projectTableColumns} bordered={true}/>
    )
}

export {ProjectsTable}
