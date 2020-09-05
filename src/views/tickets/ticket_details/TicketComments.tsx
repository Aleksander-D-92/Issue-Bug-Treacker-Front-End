import React from "react";
import {CommentDetails} from "../../shared/Interfaces";
import {Avatar, List} from "antd";
import {Link} from "react-router-dom";
import {capitalizeString, formatDate} from "../../shared/functions";
import {FileAddOutlined} from '@ant-design/icons';
import {solidColors} from "../../shared/gobalVariables";


interface Props {
    comments?: CommentDetails[]
}

function TicketComments(props: Props) {
    return (
        <List
            itemLayout="vertical"
            header={<h2>Comment section</h2>}
            dataSource={props.comments}
            pagination={{
                defaultPageSize: 4,
                total: props.comments?.length,
                position: 'bottom'
            }}
            renderItem={comment => (
                <List.Item
                    actions={[]}>
                    <List.Item.Meta
                        avatar={<Avatar style={{backgroundColor: solidColors.purple}}>C</Avatar>}
                        title={comment.description}
                        description={`Created on ${formatDate(comment.creationDate)}`}
                    />
                    <p>Submitter : {capitalizeString(comment.submitter.username)}</p>
                </List.Item>
            )}
        />
    )
}

export {TicketComments}
