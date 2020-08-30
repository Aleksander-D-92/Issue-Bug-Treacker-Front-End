import React, {useEffect, useState} from "react";
import {DashBoardTicketCharts} from "./DashBoardTicketCharts";
import {useSelector} from "react-redux";
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {ProjectViewModel, TicketViewModel} from "../shared/Interfaces";
import axios from "axios";
import {DashBoardGreeting} from "./DashBoardGreeting";
import {DashBoardProjects} from "./DashBoardProjects";


function DashBoardView() {
    const reduxState = useSelector((state: ReduxState) => state);
    const userRole = reduxState.userDetails.authority;
    const id = reduxState.userDetails.id;

    const [tickets, setTickets] = useState<TicketViewModel[]>();
    const [projects, setProjects] = useState<ProjectViewModel[]>();

    const [priorityStatistics, setPriorityStatistics] = useState([
        {type: 'Low', value: 0},
        {type: 'Medium', value: 0},
        {type: 'High', value: 0},
        {type: 'Urgent', value: 0},
    ])
    const [categoryStatistics, setCategoryStatistics] = useState([
        {type: 'Bugs and Errors', value: 0},
        {type: 'Feature Request', value: 0},
        {type: 'Other', value: 0},
    ])
    const [statusStatistics, setStatusStatistics] = useState([
        {type: 'Unassigned', value: 0},
        {type: 'In progress', value: 0},
        {type: 'Resolved', value: 0},
    ])

    function doStatistics(data: TicketViewModel[]) {
        let newPriorityStatistics = priorityStatistics;
        let newCategoryStatistics = categoryStatistics;
        let newStatusStatistics = statusStatistics;
        data.forEach(ticket => {
            switch (ticket.priority) {
                case 'LOW':
                    newPriorityStatistics[0].value++;
                    break
                case 'MEDIUM':
                    newPriorityStatistics[1].value++;
                    break
                case 'HIGH':
                    newPriorityStatistics[2].value++;
                    break
                case 'URGENT':
                    newPriorityStatistics[3].value++;
                    break
            }
            switch (ticket.category) {
                case 'BUGS_AND_ERRORS':
                    newCategoryStatistics[0].value++;
                    break
                case 'FEATURE_REQUEST':
                    newCategoryStatistics[1].value++;
                    break
                case 'OTHER':
                    newCategoryStatistics[2].value++;
                    break
            }
            switch (ticket.status) {
                case 'UNASSIGNED':
                    newStatusStatistics[0].value++;
                    break
                case 'IN_PROGRESS':
                    newStatusStatistics[1].value++;
                    break
                case 'RESOLVED':
                    newStatusStatistics[2].value++;
                    break
            }
            setPriorityStatistics(newPriorityStatistics);
            setCategoryStatistics(newCategoryStatistics);
            setStatusStatistics(newStatusStatistics);
        })
    }

    useEffect(() => {
        switch (userRole) {
            case 'ROLE_PROJECT_MANAGER':
                axios.get(`/tickets/?action=by-project-manager&id=${id}`).then((e) => {
                    doStatistics(e.data);
                    setTickets(e.data);
                });

                axios.get(`/projects?action=own&id=${id}`).then((e) => {
                    setProjects(e.data);
                })
                break;
            case 'ROLE_DEVELOPER':
                axios.get(`/tickets/?action=by-assigned-developer&id=${id}`).then((e) => {
                    doStatistics(e.data);
                    setTickets(e.data);
                });
                axios.get(`/projects?action=include-developer&id=${id}`).then((e) => {
                    setProjects(e.data);
                });
                break
            case 'ROLE_QA':
                axios.get(`/tickets/?action=by-submitter&id=${id}`).then((e) => {
                    doStatistics(e.data);
                    setTickets(e.data);
                });
                axios.get(`/projects?action=include-qa&id=${id}`).then((e) => {
                    setProjects(e.data);
                });
                break;
            case 'ROLE_ADMIN':
                axios.get('/tickets?action=all').then((e) => {
                    doStatistics(e.data);
                    setTickets(e.data);
                });
                axios.get(`/projects?action=all`).then((e) => {
                    setProjects(e.data);
                });
                break;
        }

    }, []);
    return (
        <React.Fragment>
            <DashBoardGreeting authority={reduxState.userDetails.authority} username={reduxState.userDetails.username}/>
            <DashBoardTicketCharts priorityStatistics={priorityStatistics} categoryStatistics={categoryStatistics}
                                   statusStatistics={statusStatistics}/>
            <DashBoardProjects projects={projects}/>
        </React.Fragment>
    )
}

export {DashBoardView}
