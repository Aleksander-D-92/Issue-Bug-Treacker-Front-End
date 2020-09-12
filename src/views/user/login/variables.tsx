import React from "react";

const footer = <h4>The website functionality changes depending on what role you pick</h4>

function getHeader(val: string) {
    return <p>This will log you in with a {val} account. You will be able to do the fallowing things</p>
}

const genericDescription = (
    <>
        <h2>Recommended way to login</h2>
        <ul>
            <li>Provides accounts <b>with a lot of test data added to them</b></li>
            <li>You can pick an account with one of the fallowing authorities</li>
            <ul>
                <li>Project Manager</li>
                <li>QA</li>
                <li>Developer</li>
                <li>Admin</li>
            </ul>
        </ul>
        {footer}
    </>
);
const qaDescription = (
    <div>
        <ul>
            <li>{getHeader('QA')}</li>
            <ul>
                <li>You can submit tickets for projects, that you are assigned on</li>
                <li>You can edit the tickets, submitted by your self</li>
                <li>View all projects you are assigned on</li>
                <li>Submit comments for tickets</li>
            </ul>
        </ul>
        {footer}
    </div>
);

const devDescription = (
    <div>
        <ul>
            <li>{getHeader('Developer')}</li>
            <ul>
                <li>You have tickets assigned to you</li>
                <li>You can edit the tickets assigned to you</li>
                <li>You set tickets to RESOLVED, QAs can not do that</li>
                <li>Submit comments for tickets</li>
            </ul>
        </ul>
        {footer}
    </div>
);
const managerDescription = (
    <div>
        <h2>Recommended way to demo login, it provides the most functionality</h2>
        <ul>
            <li>{getHeader('Project Manager')}</li>
            <ul>
                <li>Can create new/edit new projects</li>
                <li>You can assign QA to projects</li>
                <li>You can assign developers to tickets</li>
                <li>You can do everything that the other QA and Developer can do</li>
            </ul>
        </ul>
        {footer}
    </div>
);

const adminDescription = (
    <div>
        <ul>
            <li>{getHeader('Admin')}</li>
            <ul>
                <li>Can Change users roles, for an example:
                    <ul>
                        <li>Can promote developers to project managers</li>
                        <li>Can demote developers to submitters</li>
                        <li>A lot of the functionality of the other 3 rows will be unlocked</li>
                    </ul>
                </li>
                <li>Can view all registered users in the system</li>
            </ul>
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
            <li>If you want to experience the QA and Developer accounts</li>
            <ul>
                <li>Use the demo login</li>
                <li>Login with the accounts you have just created as a project Manager</li>
            </ul>
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
