import React, {useEffect, useState} from "react";
import {TicketStatistics} from "../../shared/TicketStatistics";
import {Bar} from "react-chartjs-2";

interface Props {
    statistics?: TicketStatistics
}

function TicketsBarChart(props: Props) {
    return (
        <React.Fragment>
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
                    ]
                }]
            }}>

            </Bar>
        </React.Fragment>
    )
}

export {TicketsBarChart}
