import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Card} from 'antd';
import {formatDate} from "../projectTables/TableVariables";

interface ProjectDesc {
    id: number,
    title: string,
    description: string
    creationDate: Date
    projectManagerId: number,
    projectManagerName: string
}

function ProjectDescription() {
    const state = useSelector((state: ReduxState) => state);
    const [projectDesc, setProjectDesc] = useState<ProjectDesc>();
    const {projectId} = useParams();
    useEffect(() => {
        axios.get(`/projects/get-project-description/${projectId}`,
            {headers: {Authorization: state.userDetails.authorizationHeader}}).then((e) => {
            setProjectDesc(e.data);
        })
    }, [])

    function capitalize(value: string | undefined): string {
        if (value === undefined) {
            return '';
        }
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return (
        <React.Fragment>
            <Card title={capitalize(projectDesc?.title)} extra={<a href="#">Edit</a>} style={{width: 300}}>
                <h3>Description</h3>
                {capitalize(projectDesc?.description)}
                <h3>Created on</h3>
                {formatDate(projectDesc?.creationDate.toString().substring(0, 10))}
                <h3>Owner</h3>
                {capitalize(projectDesc?.projectManagerName)}
            </Card>
        </React.Fragment>
    )
}

export {ProjectDescription}
