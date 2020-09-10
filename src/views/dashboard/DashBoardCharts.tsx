import React from "react";
import {Doughnut, Pie, Polar} from "react-chartjs-2";
import {Col, Collapse, Row, Spin, Typography} from "antd";
import {transparentColors} from "../shared/gobalVariables";
import {TicketStatistics} from "../shared/TicketStatistics";

const { Text, Link } = Typography;
const {Panel} = Collapse;


interface Props {
    ticketStatistics?: TicketStatistics,
    ticketsLoading: boolean
}

function DashBoardCharts(props: Props) {
    return (
        <React.Fragment>
            <Row gutter={[18, 18]} justify={'center'} className={'mt-3'}>
                <Col xs={24} sm={22} md={22} lg={7}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header={<Text style={{fontSize: '1.1rem', fontWeight: 'bold'}}>Tickets by priority</Text>} key="1">
                            <Row justify={'center'}>
                                <Spin size="large"
                                      tip={'Please wait, while we fetch the tickets data...'}
                                      style={{display: props.ticketsLoading ? '' : 'none', fontSize: '1.1rem'}}/>
                            </Row>
                            <Pie data={{
                                labels: ['Low', 'Medium', 'High', 'Urgent'],
                                datasets: [{
                                    data: [
                                        props.ticketStatistics?.low,
                                        props.ticketStatistics?.medium,
                                        props.ticketStatistics?.high,
                                        props.ticketStatistics?.urgent,
                                    ],
                                    backgroundColor: [transparentColors.green, transparentColors.yellow, transparentColors.orange, transparentColors.red],
                                    borderWidth: 2,
                                    borderColor: transparentColors.purple,
                                    hoverBorderWidth: 5,
                                }]
                            }} options={{
                                title: {
                                    display: false,
                                    text: 'nekav si text',
                                    fontSize: 30
                                }, legend: {
                                    display: true,
                                    position: "bottom",
                                },
                            }}
                                 height={400}
                            />
                        </Panel>
                    </Collapse>
                </Col>
                <Col xs={24} sm={22} md={22} lg={8}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header={<Text style={{fontSize: '1.1rem', fontWeight: 'bold'}}>Tickets by category</Text>} key="1">
                            <Row justify={'center'}>
                                <Spin size="large"
                                      tip={'Please wait, while we fetch the tickets data...'}
                                      style={{display: props.ticketsLoading ? '' : 'none', fontSize: '1.1rem'}}/>
                            </Row>
                            <Doughnut data={{
                                labels: ['Other', 'Feature Request', 'Bugs and Errors'],
                                datasets: [{
                                    data: [
                                        props.ticketStatistics?.other,
                                        props.ticketStatistics?.featureRequest,
                                        props.ticketStatistics?.bugsAndErrors,
                                    ],
                                    backgroundColor: [transparentColors.yellow, transparentColors.green, transparentColors.red],
                                    borderWidth: 2,
                                    borderColor: transparentColors.purple,
                                    hoverBorderWidth: 5,
                                }]
                            }} options={{
                                title: {
                                    display: false,
                                    text: 'nekav si text',
                                    fontSize: 30
                                }, legend: {
                                    display: true,
                                    position: "bottom",
                                }

                            }}
                                      height={345}/>
                        </Panel>
                    </Collapse>
                </Col>
                <Col xs={24} sm={22} md={22} lg={7}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header={<Text style={{fontSize: '1.1rem', fontWeight: 'bold'}}>Tickets by status</Text>} key="1">
                            <Row justify={'center'}>
                                <Spin size="large"
                                      tip={'Please wait, while we fetch the tickets data...'}
                                      style={{display: props.ticketsLoading ? '' : 'none', fontSize: '1.1rem'}}/>
                            </Row>
                            <Polar data={{
                                labels: ['Unassigned', 'In progress', 'Resolved'],
                                datasets: [{
                                    data: [
                                        props.ticketStatistics?.unassigned,
                                        props.ticketStatistics?.inProgress,
                                        props.ticketStatistics?.resolved,
                                    ],
                                    backgroundColor: [transparentColors.red, transparentColors.yellow, transparentColors.green],
                                    borderWidth: 2,
                                    borderColor: transparentColors.purple,
                                    hoverBorderWidth: 5,
                                }]
                            }} options={{
                                title: {
                                    display: false,
                                    text: 'nekav si text',
                                    fontSize: 30
                                }, legend: {
                                    display: true,
                                    position: "bottom",
                                }

                            }}
                                   height={400}/>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {DashBoardCharts}
