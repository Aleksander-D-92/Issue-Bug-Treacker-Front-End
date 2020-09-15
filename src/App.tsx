import React, {useEffect} from 'react';
import {Layout, Row, Typography} from 'antd';
import {TopSideNavigation} from "./views/navigation-bars/top/TopSideNavigation";
import {LeftNavMenu} from "./views/navigation-bars/left/LeftNavMenu";
import {WebsiteRoutes} from "./configuration/react-router-dom/WebsiteRoutes";
import {CheckIfLoggedIn} from "./views/user/check-if-logged-in/CheckIfLoggedIn";
import {AxiosGlobalInterceptors} from "./configuration/axios/AxiosGlobalInterceptors";
import axios from 'axios'
import './App.css'
import {FooterText} from "./FooterText";

const {Title, Text} = Typography;

const {Header, Footer, Sider, Content} = Layout;


function App() {
    useEffect(() => {
        axios.post('/heroku/start', {}, {}).then(() => {

        })
    }, [])
    return (
        <Layout>
            <AxiosGlobalInterceptors/>
            <CheckIfLoggedIn/>
            <Sider theme={"dark"} width={300} collapsedWidth={100} breakpoint={'md'}
                   className={'d-none d-sm-inline'}>
                <LeftNavMenu/>
            </Sider>

            <Layout>

                <Header>
                    <TopSideNavigation/>
                </Header>

                <Content style={{minHeight: '850px'}}>
                    <WebsiteRoutes/>
                </Content>

                <Footer style={{backgroundColor: '#001529'}}>
                    <FooterText/>
                </Footer>

            </Layout>
        </Layout>
    )
}

export {App}


