import React, {useEffect, useState} from "react";
import {Button, Modal} from "antd";

function CommentEdit() {
    const [visible, setVisible] = useState(false)

    function handleCancel(e: any) {
        console.log(e);
        setVisible(false)
    }

    function handleOk(e: any) {
        console.log(e);
        setVisible(false)
    }

    function showModal() {
        setVisible(true);
    }

    return (
        <React.Fragment>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Edit comment"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </React.Fragment>
    )
}

export {CommentEdit}
