import React, {useEffect, useState} from "react";
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux';
import {useParams, useHistory} from 'react-router-dom';
import {ReduxState} from "../../../configuration/redux/reduxStrore";

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
        //returns {id: 14, title: "strssing", description: "strsss2ing", creationDate: "2020-08-19T13:35:28.862+00:00", projectManagerId: 14, projectManagerName: "sasho5"}
        axios.get(`/projects/get-project-description/${projectId}`,
            {headers: {Authorization: state.userDetails.authorizationHeader}}).then((e) => {
            setProjectDesc(e.data);
        })
    }, [])
    return (
        <React.Fragment>div</React.Fragment>
    )
}

export {ProjectDescription}
