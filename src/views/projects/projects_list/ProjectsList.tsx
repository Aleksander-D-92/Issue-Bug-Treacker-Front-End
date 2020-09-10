import React, {useEffect, useState} from "react";
import {Avatar, Card, List} from 'antd';
import {ProjectDetails} from "../../shared/Interfaces";
import {capitalizeString, formatDate} from "../../shared/functions";
import {EditOutlined, EyeOutlined, FileAddOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {loadingAnimations} from "../../shared/LoadingAnimations";

interface Props {
    projects?: ProjectDetails[],
    authority: string,
    projectsLoading: boolean
}

function ProjectsList(props: Props) {
    const [header, setHeader] = useState<string>()
    const [canEdit, setCanEdit] = useState<boolean>(false);

    useEffect(() => {
        switch (props.authority) {
            case 'ROLE_PROJECT_MANAGER':
                setHeader('All your projects')
                setCanEdit(true);
                break;
            case 'ROLE_DEVELOPER':
                setHeader('Developers do not have projects')
                break
            case 'ROLE_QA':
                setHeader('All project you can submit tickets for')
                break;
            case 'ROLE_ADMIN':
                setHeader('All projects in the system')
                setCanEdit(true);
                break;
        }
    }, [])
    return (
        <React.Fragment>
            <Card>
                <List
                    itemLayout="vertical"
                    header={<h2>{header}</h2>}
                    dataSource={props.projects}
                    locale={loadingAnimations('projects')}
                    pagination={{
                        pageSize: 4, total: props.projects?.length, position: 'bottom'
                    }}
                    renderItem={project => (
                        <List.Item
                            actions={[
                                <Link to={`/projects/submit-ticket/${project.projectId}`}
                                      style={{fontSize: '1.1rem'}}
                                      className={'mr-2'}>
                                    <FileAddOutlined style={{fontSize: '1.1rem'}}/>Submit Ticket
                                </Link>,
                                <Link to={`/projects/details/${project.projectId}`}
                                      style={{fontSize: '1.1rem'}}>
                                    <EyeOutlined style={{fontSize: '1.1rem'}} className={'mr-1'}/>Details
                                </Link>,

                                canEdit ?
                                    <Link to={`/projects/edit/${project.projectId}`}
                                          style={{fontSize: '1.1rem'}}>
                                        <EditOutlined style={{fontSize: '1.1rem'}}
                                                      className={'ml-3 mr-1'}/>Edit
                                    </Link> : '',
                            ]}>
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
        </React.Fragment>
    )
}

export {ProjectsList}
