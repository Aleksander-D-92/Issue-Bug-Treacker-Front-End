import React from "react";
import {Button, Divider, Form, Select} from "antd";
import {UserSwitchOutlined} from '@ant-design/icons';
import {Authority, UserDetails} from "../../../shared/Interfaces";
import {FormInstance} from "antd/es/form";

const {Option} = Select;

interface Props {
    user?: UserDetails,
    authorities?: Authority[],
    changeAuthority: Function,
    formState: FormInstance
}

function EditUserAuthority(props: Props) {
    return (
        <React.Fragment>
            <Divider>Change authority</Divider>
            <Form
                form={props.formState}
                name="editAuthority"
                layout={'vertical'}
                initialValues={{}}
                onFinish={(e) => props.changeAuthority(e)}>
                <Form.Item
                    label="Authorities"
                    name="authorityId"
                    rules={[{required: true, message: 'Must select at least one'}]}>
                    <Select allowClear style={{width: 400}}>
                        {props.authorities?.map((authority) =>
                            (authority.authorityId !== props.user?.authority.authorityId) ?
                                <Option value={authority.authorityId}>{authority.authority} =
                                    Level {authority.authorityLevel}</Option> : ''
                        )}
                    </Select>
                </Form.Item>
                <Button type="primary" icon={<UserSwitchOutlined style={{fontSize: '1.2rem'}}/>} size={'large'}
                        block={true} htmlType={'submit'}
                        className="login-form-button">
                    Change authority
                </Button>
            </Form>
        </React.Fragment>
    )
}

export {EditUserAuthority}
