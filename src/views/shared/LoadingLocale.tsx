import React from "react";
import {Row, Skeleton, Spin} from "antd";


function loadingLocale(message: string) {
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

function noDataLocale(message: string) {
    return {
        emptyText:
            <Row justify={'center'} className={'mt-3'}>
                <Spin size="large"
                      tip={`It appears you have no ${message}`}
                      style={{fontSize: '1.1rem'}}
                />
            </Row>
    };
}

interface NodeProps {
    message: string,
    loading: boolean,
}

function LoadingNode(props: NodeProps) {
    return <Row justify={'center'} className={'mt-2'} style={{display: (props.loading) ? '' : 'none'}}>
        <Spin size="large"
              tip={`${props.message}`}
              style={{fontSize: '1.1rem'}}
        />
        <Skeleton loading={true} active={true} paragraph={{rows: 15}}/>
    </Row>
}

interface SpinnerProps {
    loading: boolean,
    description: string
}

function LoadingSpinner(props: SpinnerProps) {
    return <Row justify={'center'}>
        <Spin size="large"
              tip={`${props.description}`}
              style={{fontSize: '1rem', display: (props.loading) ? '' : 'none'}}/>
    </Row>
}

export {loadingLocale, noDataLocale, LoadingNode, LoadingSpinner}


