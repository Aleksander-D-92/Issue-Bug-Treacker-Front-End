import React from "react";
import {Row, Skeleton, Spin} from "antd";


function getLocale(message: string) {
    return {
        emptyText:
            <Row justify={'center'} className={'mt-3'}>
                <Spin size="large"
                      tip={`Please wait, until we fetch the ${message} data...`}
                      style={{fontSize: '1.1rem'}}
                />
                <Skeleton loading={true} active={true} paragraph={{rows: 15}}/>
            </Row>
    };
}

interface Props {
    message: string,
    loading: boolean,
}

function LoadingNode(props: Props) {
    return <Row justify={'center'} className={'mt-3'}>
        <Spin size="large"
              tip={`Please wait, until we fetch the ${props.message} data...`}
              style={{fontSize: '1.1rem'}}
        />
        <Skeleton loading={true} active={true} paragraph={{rows: 15}}/>
    </Row>
}

export {getLocale}


