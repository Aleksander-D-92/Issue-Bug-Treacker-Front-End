import React from "react";
import {Doughnut, Pie, Polar} from "react-chartjs-2";
import {Col, Collapse, Row} from "antd";
import {globalColors} from "../shared/gobalVariables";
import {TicketStatistics} from "../shared/TicketStatistics";

const {Panel} = Collapse;


interface Props {
    ticketStatistics?: TicketStatistics,
}

function TicketCharts(props: Props) {
    return (
        <React.Fragment>
            <Row gutter={[18, 18]} justify={'center'} className={'mt-3'}>
                <Col xs={24} sm={22} md={22} lg={7}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="Tickets by Priority" key="1">
                            <Pie data={{
                                labels: ['Low', 'Medium', 'High', 'Urgent'],
                                datasets: [{
                                    data: [
                                        props.ticketStatistics?.low,
                                        props.ticketStatistics?.medium,
                                        props.ticketStatistics?.high,
                                        props.ticketStatistics?.urgent,
                                    ],
                                    backgroundColor: [globalColors.green, globalColors.yellow, globalColors.orange, globalColors.red],
                                    borderWidth: 2,
                                    borderColor: globalColors.purple,
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
                <Col xs={24} sm={22} md={22} lg={8}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="Tickets by Category" key="1">
                            <Doughnut data={{
                                labels: ['Other', 'Feature Request', 'Bugs and Errors'],
                                datasets: [{
                                    data: [
                                        props.ticketStatistics?.other,
                                        props.ticketStatistics?.featureRequest,
                                        props.ticketStatistics?.bugsAndErrors,
                                    ],
                                    backgroundColor: [globalColors.yellow, globalColors.green, globalColors.red],
                                    borderWidth: 2,
                                    borderColor: globalColors.purple,
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
                        <Panel header="Tickets by Status" key="1">
                            <Polar data={{
                                labels: ['Unassigned', 'In progress', 'Resolved'],
                                datasets: [{
                                    data: [
                                        props.ticketStatistics?.unassigned,
                                        props.ticketStatistics?.inProgress,
                                        props.ticketStatistics?.resolved,
                                    ],
                                    backgroundColor: [globalColors.red, globalColors.yellow, globalColors.green],
                                    borderWidth: 2,
                                    borderColor: globalColors.purple,
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

export {TicketCharts}
