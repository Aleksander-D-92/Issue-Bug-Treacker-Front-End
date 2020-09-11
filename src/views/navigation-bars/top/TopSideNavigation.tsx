import React, {CSSProperties} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined} from '@ant-design/icons';
import './TopSideNavigation.css'
import {ReduxState} from "../../../configuration/redux/reduxStrore";


function TopSideNavigation() {
    const reduxState = useSelector((state: ReduxState) => state);
    const loggedIn = reduxState.userLoggedIn;

    return (
        <Menu theme="dark" mode="horizontal" className={'TopSideNavigation'} selectedKeys={[]}
              style={{fontSize: '1.1rem'}}>
            <Menu.Item icon={(loggedIn) ? <UserOutlined style={SVGStyles}/> : <UserAddOutlined style={SVGStyles}/>}
                       key="1">
                {(loggedIn) ?
                    <Link to={`/users/account-settings`}>Account Settings</Link>
                    :
                    <Link to={'/users/register'}>Register</Link>}
            </Menu.Item>
            <Menu.Item icon={(loggedIn) ? <LogoutOutlined style={SVGStyles}/> : <LoginOutlined style={SVGStyles}/>}
                       key="2">
                {(loggedIn) ?
                    <Link to={'/users/logout'}>Logout</Link>
                    :
                    <Link to={'/users/login'}>Login</Link>}
            </Menu.Item>
        </Menu>
    )
}

const SVGStyles = {
    fontSize: '1.2rem'
} as CSSProperties

export {TopSideNavigation}
