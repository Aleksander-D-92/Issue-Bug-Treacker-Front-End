import React, {useEffect} from "react";
import {Bar, BarChart, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis} from 'recharts';
import {Col, Collapse, Row} from "antd";

const {Panel} = Collapse;

interface Statistics {
    type: string;
    value: number;
}

interface Props {
    priorityStatistics: Statistics[],
    categoryStatistics: Statistics[],
    statusStatistics: Statistics[]
}

function TicketCharts(props: Props) {
    let priorityStatistics = props.priorityStatistics;
    let categoryStatistics = props.categoryStatistics;
    let statusStatistics = props.statusStatistics;
    useEffect(() => {

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
                            <BarChart width={400} height={400} data={priorityStatistics?.slice()}>
                                <XAxis dataKey="type"/>
                                <YAxis dataKey={'value'}/>
                                <Bar dataKey="value" fill="#8884d8">
                                    {priorityStatistics?.map((entry: any) => <Cell fill={decideFill(entry.type)}/>)}
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
                                <Pie data={statusStatistics?.slice()} innerRadius={90} outerRadius={140}
                                     paddingAngle={5} dataKey="value" nameKey="type" label>
                                    {statusStatistics?.map((entry) => <Cell fill={decideFill(entry.type)}/>)}
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
                                <Pie data={categoryStatistics?.slice()} dataKey="value" nameKey="type" fill='#8884d8'
                                     label>}
                                    {categoryStatistics?.map((entry) => <Cell fill={decideFill(entry.type)}/>)}
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
