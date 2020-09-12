import React, {CSSProperties, useEffect} from "react";
import {Drawer} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import {SVGStyles} from "./TopSideNavigation";
import {LeftNavMenu} from "../left/LeftNavMenu";


interface Props {
    visible: boolean,
    authority: string,
    showDrawer: Function,
    hideDrawer: Function
}

function LeftMenuDrawer(props: Props) {

    useEffect(() => {

    }, [props.authority])
    return (
        <>
            <div style={burgerStyles}
                 onClick={() => props.showDrawer()}>
                <MenuOutlined
                              style={SVGStyles}
                              className={'d-sm-inline-block d-md-none'}/>
            </div>
            <Drawer
                title="Basic Drawer"
                placement="left"
                closable={true}
                width={300}
                headerStyle={{display: 'none'}}
                bodyStyle={{padding: 0, backgroundColor: '#001529'}}
                onClose={() => props.hideDrawer()}
                visible={props.visible}
            >
                <LeftNavMenu/>
            </Drawer>
        </>
    )
}
const burgerStyles = {
    paddingLeft: 12,
    paddingRight: 3
} as CSSProperties

export {LeftMenuDrawer}
