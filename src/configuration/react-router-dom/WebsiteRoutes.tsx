import React from "react";
import {Route, Switch} from "react-router-dom";
import {LoginView} from "../../views/user/login/LoginView";
import {UserRegister} from "../../views/user/register/UserRegister";
import {AdminUsersTable} from "../../views/user/admin/AdminUsersTable";
import {EditUserVIew} from "../../views/user/admin/EditUserVIew";
import {AccountSettingsView} from "../../views/user/account-settings/AccountSettingsView";
import {HandleLogout} from "../../views/user/logout/HandleLogout";
import {ProjectDetails} from "../../views/projects/proect_details/ProjectDetailsView";
import {DashBoardView} from "../../views/dashboard/DashBoardView";
import {MyTicketsView} from "../../views/tickets/MyTicketsView";
import {SubmitTicketVIew} from "../../views/tickets/SubmitTicketVIew";
import {AllTicketsView} from "../../views/tickets/AllTicketsView";

function WebsiteRoutes() {
    return (
        <Switch>
            <Route exact path={'/users/login'}><LoginView/></Route>
            <Route exact path={'/users/register'}><UserRegister/></Route>
            <Route exact path={'/users/logout'}><HandleLogout/></Route>
            <Route exact path={'/users/account-settings/:username'}><AccountSettingsView/></Route>
            <Route exact path={'/admins/all-users'}><AdminUsersTable/></Route>
            <Route exact path={'/admins/edit-user/:userId'}><EditUserVIew/></Route>
            <Route exact path={'/dashboard'}><DashBoardView/></Route>
            <Route exact path={'/tickets/my'}><MyTicketsView/></Route>
            <Route exact path={'/tickets/submit'}><SubmitTicketVIew/></Route>
            <Route exact path={'/tickets/all'}><AllTicketsView/></Route>
            <Route exact path={'/projects/details/:projectId'}><ProjectDetails/></Route>
            {/*todo below routes not finished*/}
        </Switch>
    )
}

export {WebsiteRoutes}
