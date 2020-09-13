import React from "react";
import {TicketStatistics} from "../../shared/TicketStatistics";
import {Bar} from "react-chartjs-2";
import {transparentColors} from "../../shared/gobalVariables";
import {LoadingSpinner} from "./ProjectInfo";
import {Collapse} from 'antd';
import {Typography} from 'antd';

const {Text} = Typography;
const {Panel} = Collapse;

interface Props {
    statistics?: TicketStatistics,
}

function ProjectTicketsChart(props: Props) {
    return (
        <Collapse defaultActiveKey={['1']} className={'mt-3'}>
            <Panel header={<Text style={{fontSize: '1.1rem', fontWeight: 'bold'}}>Ticket statistics for this project</Text>} key="1">
                <LoadingSpinner loading={props.statistics === undefined} description={'Ticket statistics are being fetched'}/>
                <Bar data={{
                    labels: ['Low', 'Medium', 'High', 'Urgent', 'Other', 'Feature Request', 'Bugs and Errors', 'Unassigned', 'In progress', 'Resolved'],
                    datasets: [{
                        data: [
                            props.statistics?.low,
                            props.statistics?.medium,
                            props.statistics?.high,
                            props.statistics?.urgent,
                            props.statistics?.other,
                            props.statistics?.featureRequest,
                            props.statistics?.bugsAndErrors,
                            props.statistics?.unassigned,
                            props.statistics?.inProgress,
                            props.statistics?.resolved,
                        ],
                        backgroundColor: [
                            transparentColors.green, transparentColors.yellow, transparentColors.orange, transparentColors.red,
                            transparentColors.yellow, transparentColors.green, transparentColors.red,
                            transparentColors.red, transparentColors.yellow, transparentColors.green
                        ],
                        borderWidth: 2,
                        hoverBorderWidth: 5,
                        borderColor: [transparentColors.purple],
                        label: 'Tickets by all types'
                    }]
                }}>
                </Bar>
            </Panel>
        </Collapse>

    )
}

export {ProjectTicketsChart}
