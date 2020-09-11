import React from "react";
import {Route, Switch, useLocation} from "react-router-dom";
import {LoginView} from "../../views/user/login/LoginView";
import {UserRegisterView} from "../../views/user/register/UserRegisterView";
import {UsersTableView} from "../../views/user/admin/users_table/UsersTableView";
import {EditUserVIew} from "../../views/user/admin/edit_user/EditUserVIew";
import {AccountSettingsView} from "../../views/user/account-settings/AccountSettingsView";
import {HandleLogout} from "../../views/user/logout/HandleLogout";
import {ProjectDetailsView} from "../../views/projects/proect_details/ProjectDetailsView";
import {DashBoardView} from "../../views/dashboard/DashBoardView";
import {MyTicketsView} from "../../views/tickets/my_tickets/MyTicketsView";
import {SubmitTicketVIew} from "../../views/tickets/submit_ticket/SubmitTicketVIew";
import {AllTicketsView} from "../../views/tickets/all_tickets_admin/AllTicketsView";
import {SubmitTicketFormView} from "../../views/tickets/submit_ticket/SubmitTicketFormView";
import {ProjectEditView} from "../../views/projects/project_edit/ProjectEditView";
import {MyProjectsView} from "../../views/projects/my_projects/MyProjectsView";
import {NewProjectView} from "../../views/projects/new_project/NewProjectView";
import {TicketDetailsView} from "../../views/tickets/ticket_details/TicketDetailsView";
import {ProjectsQaActionView} from "../../views/projects/project_assign_remove_qa/ProjectsQaActionView";
import {ProjectsQaEditView} from "../../views/projects/project_assign_remove_qa/ProjectsQaEditView";
import {ManagerCreateAccView} from "../../views/user/manager/ManagerCreateAccView";
import {LandingPage} from "../../views/landing_page/LandingPage";
import {Handle404} from "../../views/404/Handle404";
import {AnimatePresence} from 'framer-motion'

function WebsiteRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter={true}>
            <Switch location={location} key={location.key}>
                <Route exact path={'/'}><LandingPage/></Route>
                <Route exact path={'/users/login'}><LoginView/></Route>
                <Route exact path={'/users/register'}><UserRegisterView/></Route>
                <Route exact path={'/users/logout'}><HandleLogout/></Route>
                <Route exact path={'/users/account-settings/:username'}><AccountSettingsView/></Route>
                <Route exact path={'/managers/create-accounts'}><ManagerCreateAccView/></Route>
                <Route exact path={'/admins/all-users'}><UsersTableView/></Route>
                <Route exact path={'/admins/edit-user/:userId'}><EditUserVIew/></Route>
                <Route exact path={'/dashboard'}><DashBoardView/></Route>
                <Route exact path={'/tickets/my'}><MyTicketsView/></Route>
                <Route exact path={'/tickets/all'} ><AllTicketsView/></Route>
                <Route exact path={'/tickets/submit'}><SubmitTicketVIew/></Route>
                <Route exact path={'/tickets/details/:ticketId'}><TicketDetailsView/></Route>
                <Route exact path={'/projects/my'}><MyProjectsView/></Route>
                <Route exact path={'/projects/new'}><NewProjectView/></Route>
                <Route exact path={'/projects/details/:projectId'}><ProjectDetailsView/></Route>
                <Route exact path={'/projects/edit/:projectId'}><ProjectEditView/></Route>
                <Route exact path={'/projects/submit-ticket/:projectId'}><SubmitTicketFormView/></Route>
                <Route exact path={'/projects/qa/:action'}><ProjectsQaActionView/></Route>
                <Route exact path={'/projects/qa/:action/:projectId'}><ProjectsQaEditView/></Route>
                <Route exact path={''}><Handle404/></Route>
            </Switch>
        </AnimatePresence>
    )
}

export {WebsiteRoutes}
