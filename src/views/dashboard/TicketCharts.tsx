import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import axios from 'axios'
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {TicketViewModel} from "../shared/Interfaces";
import {Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, Tooltip, XAxis, YAxis} from 'recharts';

const data = [
    {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 500, pv: 2000, amt: 2400},
    {name: 'Page C', uv: 800, pv: 1600, amt: 2400},
    {name: 'Page D', uv: 100, pv: 1600, amt: 2400},
    {name: 'Page F', uv: 1200, pv: 1600, amt: 2400},
];
const pesho = [
    {type: 'Low', value: 1},
    {type: 'Medium', value: 2},
    {type: 'High', value: 3},
    {type: 'Urgent', value: 4},
]

function TicketCharts() {
    const reduxState = useSelector((state: ReduxState) => state);
    const userRole = reduxState.userDetails.authority;
    const id = reduxState.userDetails.id;

    const [tickets, setTickets] = useState();

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
                })
                break;
        }

    }, []);


    function decideFill(name: string): string {
        switch (name) {
            case 'Page A':
                return 'blue'
            case 'Page B':
                return 'orange'
            case 'Page C':
                return 'brown'
            case 'Page D':
                return 'yellow'
            default:
                return '#8884d8'
        }

    }

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <React.Fragment>
            <h1>charts</h1>
            <LineChart width={1000} height={400} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="name"/>
                <YAxis dataKey={'uv'}/>
                <Tooltip/>
            </LineChart>

            <BarChart width={1000} height={400} data={data}>
                <Bar dataKey="uv" barSize={100} fill="#8884d8"
                     label={true}/>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="name"/>
                <YAxis dataKey={'uv'}/>
                <Tooltip/>
            </BarChart>

            <PieChart width={730} height={250}>
                <Pie data={data} dataKey="uv" nameKey="name" fill='#8884d8' label>
                    {data.map((entry) => <Cell fill={decideFill(entry.name)}/>)}</Pie>
                <Tooltip/>
            </PieChart>
            {/*<PieChart width={730} height={250}>*/}
            {/*    <Pie data={tickets} dataKey="id" nameKey="id" fill='#8884d8' label/>*/}
            {/*    <Tooltip/>*/}
            {/*</PieChart>*/}
            <PieChart width={730} height={250}>
                <Pie data={priorityStatistics.slice()} dataKey="value" nameKey="type" fill='#8884d8' label>}</Pie>
                <Tooltip/>
            </PieChart>
        </React.Fragment>
    )
}

export {TicketCharts}
