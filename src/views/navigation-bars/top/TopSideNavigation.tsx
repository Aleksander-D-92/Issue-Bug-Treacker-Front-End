import React, {CSSProperties, useState} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined} from '@ant-design/icons';
import {ReduxState} from "../../../configuration/redux/reduxStrore";
import {LeftMenuDrawer} from "./LeftMenyDrawer";


function TopSideNavigation() {
    const reduxState = useSelector((state: ReduxState) => state);
    const loggedIn = reduxState.userLoggedIn;
    //drawer props
    const authority = reduxState.userDetails.authority;
    const [visible, setVisible] = useState<boolean>(false)

    function showDrawer() {
        setVisible(true);
    }

    function onClose() {
        setVisible(false);
    }

    return (
        <Menu theme="dark" mode="horizontal" className={'TopSideNavigation'} selectedKeys={[]}
              style={{fontSize: '1.1rem'}}>
            <Menu.Item icon={(loggedIn) ? <LogoutOutlined style={SVGStyles}/> : <UserAddOutlined style={SVGStyles}/>}
                       key="1"
                       style={menuItemStyles}>
                {(loggedIn) ?
                    <Link to={'/users/logout'}>Logout</Link>
                    :
                    <Link to={'/users/register'}>Register</Link>}
            </Menu.Item>
            <Menu.Item icon={(loggedIn) ? <UserOutlined style={SVGStyles}/> : <LoginOutlined style={SVGStyles}/>}
                       key="2"
                       style={menuItemStyles}>
                {(loggedIn) ?
                    <Link to={`/users/account-settings`}>Account Settings</Link>
                    :
                    <Link to={'/users/login'}>Login</Link>}
            </Menu.Item>
            <Menu.Item key="3">
                <LeftMenuDrawer authority={authority}
                                visible={visible}
                                showDrawer={showDrawer}
                                hideDrawer={onClose}/>
            </Menu.Item>
        </Menu>
    )
}

const SVGStyles = {
    fontSize: '1.2rem'
} as CSSProperties

const menuItemStyles = {
    float: 'right'
} as CSSProperties

export {TopSideNavigation, SVGStyles}
