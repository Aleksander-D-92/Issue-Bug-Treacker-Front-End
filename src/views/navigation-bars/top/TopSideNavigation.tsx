import React, {useEffect, useState} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined} from '@ant-design/icons';
import './TopSideNavigation.css'
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {capitalizeString} from "../../shared/functions";


function TopSideNavigation() {
    const reduxState = useSelector((state: ReduxState) => state);
    const [menu, adjustMenu] = useState(<React.Fragment/>);
    const [username, setUsername] = useState('petar ');

    useEffect(() => {
        setUsername(reduxState.userDetails.username)
        if (reduxState.userLoggedIn) {
            adjustMenu(
                <Menu theme="dark" mode="horizontal" className={'TopSideNavigation'} selectedKeys={[]}
                      style={{fontSize: '1.1rem'}}>
                    <Menu.Item icon={<UserOutlined style={{fontSize: '1.2rem'}}/>} key="3"><Link
                        to={`/users/account-settings/${reduxState.userDetails.username}`}>Account
                        Settings</Link></Menu.Item>
                    <Menu.Item icon={<LogoutOutlined style={{fontSize: '1.2rem'}}/>} key="4"><Link
                        to={'/users/logout'}>Logout {capitalizeString(username)}</Link></Menu.Item>
                </Menu>
            )
        } else {
            adjustMenu(
                <Menu theme="dark" mode="horizontal" className={'TopSideNavigation'} selectedKeys={[]}
                      style={{fontSize: '1.1rem'}}>
                    <Menu.Item
                        icon={<LoginOutlined style={{fontSize: '1.2rem'}}/>} key="1"><Link
                        to={'/users/login'}>Login</Link></Menu.Item>
                    <Menu.Item icon={<UserAddOutlined style={{fontSize: '1.2rem'}}/>} key="2"><Link
                        to={'/users/register'}>Register</Link></Menu.Item>
                </Menu>
            )
        }

    }, [reduxState, reduxState.userLoggedIn, username])
    return (
        <React.Fragment>
            {menu}
        </React.Fragment>
    )
}

export {TopSideNavigation}
