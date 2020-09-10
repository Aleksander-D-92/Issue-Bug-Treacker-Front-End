import React from 'react';
import {Layout} from 'antd';
import {TopSideNavigation} from "./views/navigation-bars/top/TopSideNavigation";
import {LeftNavMenu} from "./views/navigation-bars/left/LeftNavMenu";
import {WebsiteRoutes} from "./configuration/react-router-dom/WebsiteRoutes";
import {CheckIfLoggedIn} from "./views/user/check-if-logged-in/CheckIfLoggedIn";
import {AxiosGlobalInterceptors} from "./configuration/axios/AxiosGlobalInterceptors";

const {Header, Footer, Sider, Content} = Layout;


function App() {

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

                <Footer style={{backgroundColor: '#001529', color: 'white'}}>
                    <h1>dasasd</h1>
                </Footer>

            </Layout>
        </Layout>
    )
}

export {App}


