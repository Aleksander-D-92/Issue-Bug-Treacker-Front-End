import React from "react";
import {Result, Row, Skeleton, Spin} from "antd";

//for table and list
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

//for table and list
function noDataLocale() {
    return {
        emptyText:
            <Row justify={'center'} className={'mt-3'}>
                <Result
                    title={'no data is available'}
                    extra={''}
                />
            </Row>
    };
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


export {loadingLocale, noDataLocale, LoadingSpinner}


