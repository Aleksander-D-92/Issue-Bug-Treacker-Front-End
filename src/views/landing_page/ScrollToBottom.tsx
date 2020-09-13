import React from "react";
import './css/scrolltobottom.css'
import {VerticalAlignBottomOutlined} from '@ant-design/icons';

function ScrollToBottom() {
    return (
        <>
            <a href={"#12232"}
               className={'scroll bottom'}>
                <VerticalAlignBottomOutlined style={{fontSize: '3rem'}}/>
            </a>
        </>
    )
}

export {ScrollToBottom}
