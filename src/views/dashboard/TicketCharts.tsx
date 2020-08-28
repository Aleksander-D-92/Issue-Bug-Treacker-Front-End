import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux';
import axios from 'axios'
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {TicketViewModel} from "../shared/Interfaces";
import {Bar, BarChart, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis} from 'recharts';
import {Col, Collapse, Row} from "antd";

const {Panel} = Collapse;


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
                });
                break;
            case 'ROLE_DEVELOPER':
                axios.get(`/tickets/?action=by-assigned-developer&id=${id}`).then((e) => {
                    doStatistics(e.data);
                    setTickets(e.data);
                });
                break
            case 'ROLE_QA_ENGINEER':
                axios.get(`/tickets/?action=by-submitter&id=${id}`).then((e) => {
                    doStatistics(e.data);
                    setTickets(e.data);
                });
                break;
        }

    }, []);


    function decideFill(name: string): string {
        switch (name) {
            case 'Low':
            case 'Feature Request':
            case 'Resolved':
                return '#00C49F'
            case 'Medium':
            case 'Other':
            case 'In progress':
                return '#FFBB28'
            case 'High':
                return '#FF8042'
            case 'Unassigned':
            case 'Urgent':
            case 'Bugs and Errors':
                return '#ff4242'
            default:
                return '#8884d8'
        }
    }

    return (
        <React.Fragment>
            <Row gutter={[18, 18]} justify={'center'} className={'mt-3'}>
                <Col xs={24} sm={22} md={22} lg={8}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="Tickets by priority" key="1">
                            <BarChart width={400} height={400} data={priorityStatistics.slice()}>
                                <XAxis dataKey="type"/>
                                <YAxis dataKey={'value'}/>
                                <Bar dataKey="value" fill="#8884d8">
                                    {priorityStatistics.map((entry) => <Cell fill={decideFill(entry.type)}/>)}
                                </Bar>
                                <Tooltip/>
                            </BarChart>
                        </Panel>
                    </Collapse>
                </Col>
                <Col xs={24} sm={22} md={22} lg={8}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="Tickets by type" key="1">
                            <PieChart width={450} height={400}>
                                <Pie data={statusStatistics.slice()} innerRadius={115} outerRadius={135}
                                     paddingAngle={5}
                                     dataKey="value" nameKey="type" label>
                                    {statusStatistics.map((entry) => <Cell fill={decideFill(entry.type)}/>)}
                                </Pie>
                                <Tooltip/>
                                <Legend/>
                            </PieChart>
                        </Panel>
                    </Collapse>
                </Col>
                <Col xs={24} sm={22} md={22} lg={8}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="Tickets by status" key="1">
                            <PieChart width={450} height={400}>
                                <Pie data={categoryStatistics.slice()} dataKey="value" nameKey="type" fill='#8884d8'
                                     label>}
                                    {categoryStatistics.map((entry) => <Cell fill={decideFill(entry.type)}/>)}
                                </Pie>
                                <Tooltip/>
                                <Legend/>
                            </PieChart>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {TicketCharts}
