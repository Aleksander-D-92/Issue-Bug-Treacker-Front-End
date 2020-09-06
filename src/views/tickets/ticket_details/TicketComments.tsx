import React, {MouseEvent} from "react";
import {CommentDetails} from "../../shared/Interfaces";
import {Avatar, Button, List} from "antd";
import {capitalizeString, formatDate} from "../../shared/functions";
import {solidColors} from "../../shared/gobalVariables";
import axios from 'axios'


interface Props {
    comments?: CommentDetails[],
    loggedUserId: number,
    deleteComment: Function
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
                    actions={[
                        (comment.submitter.userId === props.loggedUserId) ?
                            <Button onClick={(e) => props.deleteComment(e)}
                                    id={comment.commentId.toString()}
                                    type="primary"
                                    danger={true}>Delete comment</Button> : ''
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
