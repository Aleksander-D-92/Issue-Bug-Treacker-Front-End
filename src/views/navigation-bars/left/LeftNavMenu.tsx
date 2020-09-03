import React, {useEffect, useState} from "react";
import {Menu} from 'antd';
import {BugOutlined, ContainerOutlined, DesktopOutlined, FileTextOutlined, PieChartOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";

const {SubMenu} = Menu;


function LeftNavMenu() {
    const state = useSelector((state: ReduxState) => state);
    const [authority, setAuthority] = useState<string | undefined>(state.userDetails.authority)

    useEffect(() => {
        setAuthority(state.userDetails.authority);
        switch (authority) {
            case 'ROLE_QA':
                break;
            case 'ROLE_DEVELOPER':
                break;
            case 'ROLE_PROJECT_MANAGER':
                break;
            case 'ROLE_ADMIN':
                break;
            default:
                break;
        }
    }, [state])

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
                    <Link to={'/admins/all-users'}>Mange Users</Link>
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
                    <Menu.Item key="13"><Link to={'/tickets/all'}>All Tickets</Link></Menu.Item>
                    <Menu.Item key="14"><Link to={'/tickets/my'}>My Tickets</Link></Menu.Item>
                    <Menu.Item key="15"><Link to={'/tickets/submit'}>Submit Ticket</Link></Menu.Item>
                </SubMenu>
            </Menu>

        </React.Fragment>
    )
}

export {LeftNavMenu}
