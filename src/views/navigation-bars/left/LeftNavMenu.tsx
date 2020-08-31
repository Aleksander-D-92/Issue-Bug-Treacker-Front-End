import React from "react";
import {Menu} from 'antd';
import {BugOutlined, ContainerOutlined, DesktopOutlined, FileTextOutlined, PieChartOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";

const {SubMenu} = Menu;


function LeftNavMenu() {
    const state = useSelector((state: ReduxState) => state);
    let authority = state.userDetails.authority;
    return (
        <React.Fragment>
            <Menu className={''} defaultSelectedKeys={['0']} defaultOpenKeys={['projects', 'tickets']} mode="inline"
                  theme="dark"
                  style={{fontSize: '1.1rem'}}>
                <Menu.Item key="0" icon={<BugOutlined style={{fontSize: '1.4rem'}}/>} className={'mb-5'}>
                    <Link to={'./'} style={{fontSize: '1.4rem'}}>Issue Tracker</Link>
                </Menu.Item>
                <Menu.Item key="1" icon={<ContainerOutlined/>}>
                    <Link to={'/dashboard'}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined style={{fontSize: '1.2rem'}}/>}>
                    <Link to={'/admins/get-all-users'}>Mange Users</Link>
                </Menu.Item>
                <SubMenu
                    key="projects"
                    title={<span><PieChartOutlined style={{fontSize: '1.2rem'}}/><span>Projects</span></span>}>
                    <Menu.Item key="9">New Project</Menu.Item>
                    <Menu.Item key="10">My projects</Menu.Item>
                    <Menu.Item key="11">Assign Staff</Menu.Item>
                    <Menu.Item key="12">Remove Staff</Menu.Item>
                </SubMenu>
                <SubMenu
                    key="tickets"
                    title={<span><FileTextOutlined style={{fontSize: '1.2rem'}}/><span>Tickets</span></span>}>
                    <Menu.Item key="13">All Tickets</Menu.Item>
                    <Menu.Item key="14">My Tickets</Menu.Item>
                    <Menu.Item key="15">Submit Ticket</Menu.Item>
                </SubMenu>
            </Menu>

        </React.Fragment>
    )
}

export {LeftNavMenu}
