import React from "react";

const genericDescription = (
    <div>
        <p>Allows you to login with an already existing account <br/> <b>with a lot of test data added to
            it</b>. <br/> You can pick an account with one of the
            fallowing authorities</p>
        <ul>
            <li>QA</li>
            <li>Developer</li>
            <li>Project Manager</li>
            <li>Admin</li>
        </ul>
        <p>The website changes depending on what role you pick</p>
    </div>
);
const qaDescription = (
    <div>
        <p>This will log you in with a QA account <br/> You will be able to do the fallowing things</p>
        <ul>
            <li>Can Submit tickets for projects you are assigned on</li>
            <li>Can edit tickets submitted by him</li>
            <li>View all projects you are assigned on</li>
        </ul>
        <p>The website changes depending on what role you pick</p>
    </div>
);

const devDescription = (
    <div>
        <p>This will log you in with a Developer account <br/> You will be able to do the fallowing things</p>
        <ul>
            <li>Has tickets assigned to him</li>
            <li>Can edit tickets assigned to him</li>
            <li>Can set tickets to RESOLVED, QAs can not do that</li>
            <li>View all projects you are assigned on</li>
        </ul>
        <p>The website changes depending on what role you pick</p>
    </div>
);
const managerDescription = (
    <div>
        <p>This will log you in with a Developer account <br/> You will be able to do the fallowing things</p>
        <ul>
            <li>Can create new/edit new projects</li>
            <li>Can create Developer accounts to assign to his projects</li>
            <li>Can create Submitter accounts to assign to his projects</li>
            <li>Can everything that the other QA Engineer and Developer can do</li>
        </ul>
        <p>The website changes depending on what role you pick</p>
    </div>
);

const adminDescription = (
    <div>
        <p>This will log you in with an Admin account <br/> You will be able to do the fallowing things</p>
        <ul>
            <li>Changes user role, for an example:
                <br/>-promote developers to project managers
                <br/>-demote developers to submitters
            </li>
            <li>Can view all registered users in the system</li>
        </ul>
        <p>The website changes depending on what role you pick</p>
    </div>
);

const demoQaCredentials = {username: "submitter1", password: '1234'};
const demoDevCredentials = {username: "developer1", password: '1234'};
const demoManagerCredentials = {username: "manager1", password: '1234'};
const demoAdminCredentials = {username: "admin1", password: '1234'};

export {
    genericDescription,
    qaDescription,
    devDescription,
    demoAdminCredentials,
    demoDevCredentials,
    demoManagerCredentials,
    demoQaCredentials,
    managerDescription,
    adminDescription
}
