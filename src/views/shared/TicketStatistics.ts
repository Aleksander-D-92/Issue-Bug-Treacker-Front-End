import {TicketDetails} from "./Interfaces";

export interface TicketStatistics {
    low: number,
    medium: number,
    high: number,
    urgent: number,
    bugsAndErrors: number,
    featureRequest: number,
    other: number,
    unassigned: number,
    inProgress: number,
    resolved: number
}

function doTicketStatistics(data: TicketDetails[]): TicketStatistics {
    let ticketStatistics = {
        low: 0,
        medium: 0,
        high: 0,
        urgent: 0,
        bugsAndErrors: 0,
        featureRequest: 0,
        other: 0,
        unassigned: 0,
        inProgress: 0,
        resolved: 0
    }
    data.forEach(ticket => {
        switch (ticket.priority) {
            case 'LOW':
                ticketStatistics.low++;
                break
            case 'MEDIUM':
                ticketStatistics.medium++;
                break
            case 'HIGH':
                ticketStatistics.high++;
                break
            case 'URGENT':
                ticketStatistics.urgent++;
                break
        }
        switch (ticket.category) {
            case 'BUGS_AND_ERRORS':
                ticketStatistics.bugsAndErrors++;
                break
            case 'FEATURE_REQUEST':
                ticketStatistics.featureRequest++;
                break
            case 'OTHER':
                ticketStatistics.other++;
                break
        }
        switch (ticket.status) {
            case 'UNASSIGNED':
                ticketStatistics.unassigned++;
                break
            case 'IN_PROGRESS':
                ticketStatistics.inProgress++;
                break
            case 'RESOLVED':
                ticketStatistics.resolved++;
                break
        }
    })
    return ticketStatistics;
}

export {doTicketStatistics}
