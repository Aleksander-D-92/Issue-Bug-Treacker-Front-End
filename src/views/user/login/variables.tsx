import React from "react";

const footer = <p>The website functionality changes depending on what role you pick</p>

function getHeader(val: string) {
    return <p>This will log you in with a {val} account <br/> You will be able to do the fallowing things</p>
}

const genericDescription = (
    <div>
        <p>Allows you to login with an already existing account, <br/> <b>with a lot of test data added to
            it</b>. <br/> You can pick an account with one of the
            fallowing authorities</p>
        <ul>
            <li>QA</li>
            <li>Developer</li>
            <li>Project Manager</li>
            <li>Admin</li>
        </ul>
        {footer}
    </div>
);
const qaDescription = (
    <div>
        {getHeader('QA')}
        <ul>
            <li>You can submit tickets for projects, that you are assigned on</li>
            <li>You can edit the tickets, submitted by your self</li>
            <li>View all projects you are assigned on</li>
            <li>Submit comments for tickets</li>
        </ul>
        {footer}
    </div>
);

const devDescription = (
    <div>
        {getHeader('Developer')}
        <ul>
            <li>You have tickets assigned to you</li>
            <li>You can edit the tickets assigned to you</li>
            <li>You set tickets to RESOLVED, QAs can not do that</li>
            <li>Submit comments for tickets</li>
        </ul>
        {footer}
    </div>
);
const managerDescription = (
    <div>
        <b>Recommended way to demo login, it provides the most functionality</b>
        {getHeader('Project Manager')}
        <ul>
            <li>Can create new/edit new projects</li>
            <li>You can assign QA to projects</li>
            <li>You can assign developers to tickets</li>
            <li>You can do everything that the other QA and Developer can do</li>
        </ul>
        {footer}
    </div>
);

const adminDescription = (
    <div>
        {getHeader('Admin')}
        <ul>
            <li>Can Change users roles, for an example:
                <ul>
                    <li>Can promote developers to project managers</li>
                    <li>Can demote developers to submitters</li>
                </ul>
            </li>
            <li>Can view all registered users in the system</li>
        </ul>
        {footer}
    </div>
);

const registerExplained = (
    <div>
        <h2>In short:</h2>
        <ul>
            <li>The way this website works, you have to register as a Project Manager.</li>
            <li>Project managers can create QA and Developer accounts to "work" for them.</li>
            <li>If you want to experience the QA and Developer accounts, please use the demo login</li>
        </ul>
    </div>
)

const demoManagerCredentials = {username: "demo_manager", password: '123056a'};
const demoDevCredentials = {username: "demo_developer", password: '123056a'};
const demoQaCredentials = {username: "demo_qa", password: '123056a'};
const demoAdminCredentials = {username: "admin", password: '123056a'};

export {
    genericDescription,
    qaDescription,
    devDescription,
    demoAdminCredentials,
    demoDevCredentials,
    demoManagerCredentials,
    demoQaCredentials,
    managerDescription,
    adminDescription,
    registerExplained
}
