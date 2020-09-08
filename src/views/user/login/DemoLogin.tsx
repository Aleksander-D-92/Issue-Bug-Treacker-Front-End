import React from "react";
import {Button, Card, Popover} from "antd";
import {adminDescription, devDescription, genericDescription, managerDescription, qaDescription} from "./variables";

interface Props {
    isLoading: boolean,
    handleDemoLogin: Function
}

function DemoLogin(props: Props) {
    return <React.Fragment>
        <Card title={<h2>Demo Login</h2>} extra={
            <Popover placement="left" title={genericDescription}>
                <h2 style={{color: "#659edd", cursor: 'pointer'}}>What is this ?</h2>
            </Popover>
        }>
            <Popover placement="left" title={managerDescription}>
                <Button type="primary"
                        htmlType="submit"
                        className="login-form-button mb-2"
                        block={true}
                        name='projectManager'
                        loading={props.isLoading}
                        onClick={(e) => props.handleDemoLogin(e)}>
                    Demo Project Manager
                </Button>
            </Popover>
            <Popover placement="left" title={qaDescription}>
                <Button type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        block={true}
                        name='qa'
                        loading={props.isLoading}
                        onClick={(e) => props.handleDemoLogin(e)}>
                    Demo QA Engineer
                </Button>
            </Popover>
            <Popover placement="left" title={devDescription}>
                <Button type="primary"
                        htmlType="submit"
                        className="login-form-button mt-2"
                        block={true}
                        name='developer'
                        loading={props.isLoading}
                        onClick={(e) => props.handleDemoLogin(e)}>
                    Demo Developer
                </Button>
            </Popover>
            <Popover placement="left" title={adminDescription}>
                <Button type="primary"
                        htmlType="submit"
                        className="login-form-button mt-2"
                        block={true}
                        name='admin'
                        loading={props.isLoading}
                        onClick={(e) => props.handleDemoLogin(e)}>
                    Demo admin
                </Button>
            </Popover>
        </Card>
    </React.Fragment>;
}

export {DemoLogin}
