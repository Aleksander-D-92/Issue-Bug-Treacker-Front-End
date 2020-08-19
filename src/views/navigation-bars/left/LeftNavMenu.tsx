import React from "react";
import {Menu} from 'antd';
import {ContainerOutlined, DesktopOutlined, PieChartOutlined,} from '@ant-design/icons';
import {Link} from "react-router-dom";


function LeftNavMenu() {
    return (
        <React.Fragment>
            <Menu className={''} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark">
                <Menu.Item key="1" icon={<PieChartOutlined style={{fontSize: '1.2rem'}}/>} className={'mb-5'}
                           style={{fontSize: '1.2rem'}}>
                    <Link to={'./'}>Landing page</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    <Link to={'/admins/get-all-users'}>User roles</Link>
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
                    My Projects
                </Menu.Item>
                <Menu.Item key="7" icon={<ContainerOutlined/>}>
                    My Tickets
                </Menu.Item>
            </Menu>

        </React.Fragment>
    )
}

export {LeftNavMenu}