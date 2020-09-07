import React from "react";
import {Button, Divider} from "antd";
import {UserDetails} from "../../../shared/Interfaces";
import {LockOutlined, UnlockOutlined} from '@ant-design/icons';

interface Props {
    user?: UserDetails,
    lockAccount: Function
}

function ChangeAccountLock(props: Props) {
    return (
        <React.Fragment>
            <Divider>Set account lock</Divider>
            <Button type={'primary'} danger={true} icon={<LockOutlined style={{fontSize: '1.2rem'}}/>}
                    size={'large'}
                    onClick={(e) => props.lockAccount(e)}
                    block={true} className={'mt-2'}
                    name={'lock'}
                    disabled={!props.user?.accountNonLocked}>
                Lock account
            </Button>
            <Button type={'primary'} icon={<UnlockOutlined style={{fontSize: '1.1rem'}}/>} size={'large'}
                    onClick={(e) => props.lockAccount(e)}
                    block={true} className={'mt-2'}
                    name={'unlock'}
                    disabled={!!props.user?.accountNonLocked}>
                Unlock account
            </Button>
        </React.Fragment>
    )
}

export {ChangeAccountLock}
