import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios'
import {ReduxState} from "../../configuration/redux/reduxStrore";
import {TicketViewModel} from "../shared/Interfaces";


function TicketCharts() {
    const reduxState = useSelector((state: ReduxState) => state);
    const [tickets, setTickets] = useState<TicketViewModel[]>();
    useEffect(() => {
        const userRole = reduxState.userDetails.authority;
        console.log('dsaadsas');
        console.log(reduxState);
        console.log(userRole);
        switch (userRole) {
            case 'ROLE_PROJECT_MANAGER':
                axios.get(`/tickets/?action=by-project-manager&id=${reduxState.userDetails.id}`).then((e) => {
                    console.log(e);
                    setTickets(e.data);
                })
                break;
        }
    }, [])
    return (
        <React.Fragment>
            <h1>Charts</h1>
        </React.Fragment>
    )
}

export {TicketCharts}
