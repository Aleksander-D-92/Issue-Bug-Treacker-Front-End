import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";
import {UserLogin} from "../../views/user/login/UserLogin";
import {UserRegister} from "../../views/user/register/UserRegister";
import {AdminPage} from "../../views/user-roles/AdminPage";
import {UserDetails} from "../../views/user-roles/UserDetails";
import {AccountSettings} from "../../views/user/account-settings/AccountSettings";
import {HandleLogout} from "../../views/user/logout/HandleLogout";
import {CheckIfLoggedIn} from "../../views/user/check-if-logged-in/CheckIfLoggedIn";

function WebsiteRoutes() {
    return (
        <Switch>
            <Route exact path={'/users/login'}><UserLogin/></Route>
            <Route exact path={'/users/register'}><UserRegister/></Route>
            <Route exact path={'/users/logout'}><HandleLogout/></Route>
            <Route exact path={'/users/account-settings/:username'}><AccountSettings/></Route>
            <Route exact path={'/admins/get-all-users'}><AdminPage/></Route>
            <Route exact path={'/admins/get-user-details-by-id/:userId'}><UserDetails/></Route>
        </Switch>
    )
}

export {WebsiteRoutes}
