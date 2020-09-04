import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {Button, Card, Divider} from 'antd';
import {formatDate} from "../project-tables/TableVariables";

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
    const history = useHistory();
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

    function redirectToSubmit() {
        history.push(`/tickets/submit-ticket/${projectId}`)
    }

    return (
        <React.Fragment>
            <Divider orientation="left">Project description</Divider>
            <Card title={capitalize(projectDesc?.title)} extra={<a href="#">Edit</a>} style={{width: 300}}>
                <h3>Description</h3>
                {capitalize(projectDesc?.description)}
                <h3>Created on</h3>
                {formatDate(projectDesc?.creationDate.toString().substring(0, 10))}
                <h3>Owner</h3>
                {capitalize(projectDesc?.projectManagerName)}
            </Card>
            <Button type="primary" block onClick={redirectToSubmit}>
                Submit a new ticket
            </Button>
        </React.Fragment>
    )
}

export {ProjectDescription}
