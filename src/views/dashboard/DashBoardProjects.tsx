import React from "react";
import {Avatar, Card, Col, List, Row} from 'antd';
import {ProjectDetails} from "../shared/Interfaces";
import {capitalizeString, formatDate} from "../shared/functions";

interface Props {
    projects?: ProjectDetails[]
}

function DashBoardProjects(props: Props) {
    return (
        <React.Fragment>
            <Row justify={'center'}>
                <Col xs={24} sm={22} md={22} lg={22} xl={22}>
                    <Card>
                        <List
                            itemLayout="vertical"
                            header={<h2>Your projects</h2>}
                            dataSource={props.projects}
                            pagination={{
                                pageSize: 5, total: props.projects?.length, position: 'bottom'
                            }}
                            renderItem={project => (
                                <List.Item actions={[<span>Details</span>, <span>Edit</span>]}>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{backgroundColor: '#87d068'}}>P</Avatar>}
                                        title={project.title}
                                        description={project.description}
                                    />
                                    <div>Created by : {capitalizeString(project.projectManager.username)}</div>
                                    <div>Created on : {formatDate(project.creationDate)}</div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export {DashBoardProjects}
