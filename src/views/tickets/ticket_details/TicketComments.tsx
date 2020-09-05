import React from "react";
import {CommentDetails} from "../../shared/Interfaces";
import {Avatar, List} from "antd";
import {Link} from "react-router-dom";
import {capitalizeString, formatDate} from "../../shared/functions";
import {EyeOutlined, FileAddOutlined} from '@ant-design/icons';
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
                pageSize: 4, total: props.comments?.length, position: 'bottom'
            }}
            renderItem={comment => (
                <List.Item
                    actions={[
                        <Link to={`/projects/submit-ticket/${comment.commentId}`}
                              style={{fontSize: '1.1rem'}} className={'mr-2'}>
                            <FileAddOutlined style={{fontSize: '1.1rem'}}/>Submit Ticket</Link>,
                        <Link to={`/projects/details/${comment.commentId}`}
                              style={{fontSize: '1.1rem'}}>
                            <EyeOutlined style={{fontSize: '1.1rem'}} className={'mr-1'}/>Details</Link>,
                    ]}>
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
