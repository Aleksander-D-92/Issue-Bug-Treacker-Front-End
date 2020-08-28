import React from "react";
import {Route, Switch} from "react-router-dom";
import {LoginView} from "../../views/user/login/LoginView";
import {UserRegister} from "../../views/user/register/UserRegister";
import {AdminPage} from "../../views/user/admin/AdminPage";
import {UserDetails} from "../../views/user/admin/UserDetails";
import {AccountSettingsView} from "../../views/user/account-settings/AccountSettingsView";
import {HandleLogout} from "../../views/user/logout/HandleLogout";
import {ProjectsTable} from "../../views/projects/project-tables/ProjectsTable";
import {CreateProjectView} from "../../views/projects/create-porject/CreateProject";
import {ProjectsTableOwn} from "../../views/projects/project-tables/ProjectsTableOwn";
import {ProjectDetails} from "../../views/projects/proect-details/ProjectDetailsView";
import {TicketSubmitForm} from "../../views/projects/submit-ticket/TicketSubmitForm";
import {DashBoardView} from "../../views/dashboard/DashBoardView";

function WebsiteRoutes() {
    return (
        <Switch>
            <Route exact path={'/users/login'}><LoginView/></Route>
            <Route exact path={'/users/register'}><UserRegister/></Route>
            <Route exact path={'/users/logout'}><HandleLogout/></Route>
            <Route exact path={'/users/account-settings/:username'}><AccountSettingsView/></Route>
            <Route exact path={'/admins/get-all-users'}><AdminPage/></Route>
            <Route exact path={'/admins/get-user-details-by-id/:userId'}><UserDetails/></Route>
            <Route exact path={'/dashboard'}><DashBoardView/></Route>
            {/*todo below routes not finished*/}
            <Route exact path={'/projects/get-all-projects'}><ProjectsTable/></Route>
            <Route exact path={'/projects/get-own-projects'}><ProjectsTableOwn/></Route>
            <Route exact path={'/projects/create-project'}><CreateProjectView/></Route>
            <Route exact path={'/projects/project-details/:projectId'}><ProjectDetails/></Route>
            <Route exact path={'/tickets/submit-ticket/:projectId'}><TicketSubmitForm/></Route>
        </Switch>
    )
}

export {WebsiteRoutes}
