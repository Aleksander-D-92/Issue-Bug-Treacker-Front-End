import React, {ReactNode, useEffect, useState} from "react";
import {Menu} from 'antd';
import {
    BugOutlined,
    FileTextOutlined,
    IdcardOutlined,
    PieChartOutlined,
    UserAddOutlined,
    UsergroupAddOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {useSelector} from 'react-redux';
import {ReduxState} from "../../../configuration/redux/reduxStrore";

const {SubMenu} = Menu;


function LeftNavMenu() {
    const state = useSelector((state: ReduxState) => state);
    const [authority, setAuthority] = useState<string | undefined>(state.userDetails.authority);
    const [menu, setMenu] = useState<ReactNode>()

    useEffect(() => {
        setAuthority(state.userDetails.authority);
        switch (authority) {
            case 'ROLE_QA':
                setMenu(<>
                    <Menu className={''}
                          defaultSelectedKeys={['0']}
                          defaultOpenKeys={['projects', 'tickets']}
                          mode="inline"
                          theme="dark"
                          style={{fontSize: '1.1rem'}}>
                        <Menu.Item key="0" icon={<BugOutlined style={{fontSize: '1.4rem'}}/>} className={'mb-5'}>
                            <Link to={'/'} style={{fontSize: '1.4rem'}}>Bug Tracker</Link>
                        </Menu.Item>
                        <Menu.Item key="1" icon={<IdcardOutlined style={{fontSize: '1.2rem'}}/>}>
                            <Link to={'/dashboard'}>Dashboard</Link>
                        </Menu.Item>
                        <SubMenu
                            key="projects"
                            title={<span><PieChartOutlined style={{fontSize: '1.2rem'}}/><span>Projects</span></span>}>
                            <Menu.Item key="9"><Link to={'/projects/my'}>My Projects</Link></Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="tickets"
                            title={<span><FileTextOutlined style={{fontSize: '1.2rem'}}/><span>Tickets</span></span>}>
                            <Menu.Item key="14"><Link to={'/tickets/my'}>My Tickets</Link></Menu.Item>
                            <Menu.Item key="15"><Link to={'/tickets/submit'}>Submit Ticket</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </>);
                break;
            case 'ROLE_DEVELOPER':
                setMenu(<>
                    <Menu className={''}
                          defaultSelectedKeys={['0']}
                          defaultOpenKeys={['projects', 'tickets']}
                          mode="inline"
                          theme="dark"
                          style={{fontSize: '1.1rem'}}>
                        <Menu.Item key="0" icon={<BugOutlined style={{fontSize: '1.4rem'}}/>} className={'mb-5'}>
                            <Link to={'/'} style={{fontSize: '1.4rem'}}>Bug Tracker</Link>
                        </Menu.Item>
                        <Menu.Item key="1" icon={<IdcardOutlined style={{fontSize: '1.2rem'}}/>}>
                            <Link to={'/dashboard'}>Dashboard</Link>
                        </Menu.Item>
                        <SubMenu
                            key="tickets"
                            title={<span><FileTextOutlined style={{fontSize: '1.2rem'}}/><span>Tickets</span></span>}>
                            <Menu.Item key="14"><Link to={'/tickets/my'}>My Tickets</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </>)
                break;
            case 'ROLE_PROJECT_MANAGER':
                setMenu(
                    <>
                        <Menu className={''}
                              defaultSelectedKeys={['0']}
                              defaultOpenKeys={['projects', 'tickets']}
                              mode="inline"
                              theme="dark"
                              style={{fontSize: '1.1rem'}}>
                            <Menu.Item key="0" icon={<BugOutlined style={{fontSize: '1.4rem'}}/>} className={'mb-5'}>
                                <Link to={'/'} style={{fontSize: '1.4rem'}}>Bug Tracker</Link>
                            </Menu.Item>
                            <Menu.Item key="1" icon={<IdcardOutlined style={{fontSize: '1.2rem'}}/>}>
                                <Link to={'/dashboard'}>Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<UserAddOutlined style={{fontSize: '1.2rem'}}/>}>
                                <Link to={'/managers/create-accounts'}>Create accounts</Link>
                            </Menu.Item>
                            <SubMenu
                                key="projects"
                                title={<span><PieChartOutlined
                                    style={{fontSize: '1.2rem'}}/><span>Projects</span></span>}>
                                <Menu.Item key="9"><Link to={'/projects/my'}>My Projects</Link></Menu.Item>
                                <Menu.Item key="10"><Link to={'/projects/new'}>New Project</Link></Menu.Item>
                                <Menu.Item key="11"><Link to={'/projects/qa/assign'}>Assign Qa</Link></Menu.Item>
                                <Menu.Item key="12"><Link to={'/projects/qa/remove'}>Remove Qa</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="tickets"
                                title={<span><FileTextOutlined
                                    style={{fontSize: '1.2rem'}}/><span>Tickets</span></span>}>
                                <Menu.Item key="14"><Link to={'/tickets/my'}>My Tickets</Link></Menu.Item>
                                <Menu.Item key="15"><Link to={'/tickets/submit'}>Submit Ticket</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </>
                )
                break;
            case 'ROLE_ADMIN':
                setMenu(
                    <>
                        <Menu className={''}
                              defaultSelectedKeys={['0']}
                              defaultOpenKeys={['projects', 'tickets']}
                              mode="inline"
                              theme="dark"
                              style={{fontSize: '1.1rem'}}>
                            <Menu.Item key="0" icon={<BugOutlined style={{fontSize: '1.4rem'}}/>} className={'mb-5'}>
                                <Link to={'/'} style={{fontSize: '1.4rem'}}>Bug Tracker</Link>
                            </Menu.Item>
                            <Menu.Item key="1" icon={<IdcardOutlined style={{fontSize: '1.2rem'}}/>}>
                                <Link to={'/dashboard'}>Dashboard</Link>
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UsergroupAddOutlined style={{fontSize: '1.2rem'}}/>}>
                                <Link to={'/admins/all-users'}>Mange Users</Link>
                            </Menu.Item>
                            <Menu.Item key="3" icon={<UserAddOutlined style={{fontSize: '1.2rem'}}/>}>
                                <Link to={'/managers/create-accounts'}>Create accounts</Link>
                            </Menu.Item>
                            <SubMenu
                                key="projects"
                                title={<span><PieChartOutlined
                                    style={{fontSize: '1.2rem'}}/><span>Projects</span></span>}>
                                <Menu.Item key="9"><Link to={'/projects/my'}>My Projects</Link></Menu.Item>
                                <Menu.Item key="10"><Link to={'/projects/new'}>New Project</Link></Menu.Item>
                                <Menu.Item key="11"><Link to={'/projects/qa/assign'}>Assign Qa</Link></Menu.Item>
                                <Menu.Item key="12"><Link to={'/projects/qa/remove'}>Remove Qa</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="tickets"
                                title={<span><FileTextOutlined
                                    style={{fontSize: '1.2rem'}}/><span>Tickets</span></span>}>
                                <Menu.Item key="13"><Link to={'/tickets/all'}>All Tickets</Link></Menu.Item>
                                <Menu.Item key="14"><Link to={'/tickets/my'}>My Tickets</Link></Menu.Item>
                                <Menu.Item key="15"><Link to={'/tickets/submit'}>Submit Ticket</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </>
                )
                break;
            default:
                setMenu(<>
                    <Menu className={''}
                          defaultSelectedKeys={['0']}
                          defaultOpenKeys={['projects', 'tickets']}
                          mode="inline"
                          theme="dark"
                          style={{fontSize: '1.1rem'}}>
                        <Menu.Item key="0" icon={<BugOutlined style={{fontSize: '1.4rem'}}/>} className={'mb-5'}>
                            <Link to={'/'} style={{fontSize: '1.4rem'}}>Bug Tracker</Link>
                        </Menu.Item>
                        <Menu.Item key="1"
                                   icon={<ExclamationCircleOutlined style={{fontSize: '1.2rem'}}/>}
                                   className={''}>
                            <Link to={'/users/login'} style={{fontSize: '1.2rem'}}>Login to unlock more</Link>
                        </Menu.Item>
                    </Menu>
                </>)
                break;
        }
    }, [authority, state])

    return (
        <>
            {menu}
        </>
    )
}

export {LeftNavMenu}
