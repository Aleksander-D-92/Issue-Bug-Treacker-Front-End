import React, {useEffect, useState} from "react";

interface Props {
    username: string,
    authority: string
}

function DashBoardGreeting(props: Props) {
    let strings = props.authority?.split('_');
    return (
        <React.Fragment>
            <h2>Hello {props.username} to the {props.authority} dashboard</h2>
        </React.Fragment>
    )
}

export {DashBoardGreeting}
