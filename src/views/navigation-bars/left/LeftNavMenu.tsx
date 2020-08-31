import React from "react";
import {Menu} from 'antd';
import {ContainerOutlined, DesktopOutlined, PieChartOutlined,} from '@ant-design/icons';
import {Link} from "react-router-dom";


function LeftNavMenu() {
    return (
        <React.Fragment>
            <Menu className={''} defaultSelectedKeys={['0']} defaultOpenKeys={['sub1']} mode="inline" theme="dark"
                  style={{fontSize: '1.1rem'}}>
                <Menu.Item key="0" icon={<PieChartOutlined style={{fontSize: '1.2rem'}}/>} className={'mb-5'}
                           style={{fontSize: '1.2rem'}}>
                    <Link to={'./'}>Landing page</Link>
                </Menu.Item>
                <Menu.Item key="1" icon={<ContainerOutlined/>}>
                    <Link to={'/dashboard'}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined style={{fontSize: '1.2rem'}}/>}>
                    <Link to={'/admins/get-all-users'}>Mange Users</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<DesktopOutlined/>}>
                    <Link to={'/projects/get-all-projects'}>All projects</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<DesktopOutlined/>}>
                    <Link to={'/projects/get-own-projects'}>My projects</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<ContainerOutlined/>}>
                    <Link to={'/projects/create-project'}>Create Project</Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<ContainerOutlined/>}>
                    My Comments
                </Menu.Item>
                <Menu.Item key="7" icon={<ContainerOutlined/>}>
                    My Tickets
                </Menu.Item>
                <Menu.Item key="8" icon={<ContainerOutlined/>}>
                    All tickets
                </Menu.Item>
                <Menu.Item key="9" icon={<ContainerOutlined/>}>
                    Submit a ticket
                </Menu.Item>
            </Menu>

        </React.Fragment>
    )
}

export {LeftNavMenu}
