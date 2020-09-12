import React, {CSSProperties, useEffect} from "react";
import {motion} from "framer-motion";
import {Card, Col, Image, Row} from 'antd';
import {routerVariant} from "../shared/gobalVariables";
import {Typography} from 'antd';

const {Text} = Typography;

function LandingPage() {
    const phonePicUrl = 'https://i.ibb.co/1Tf0S7v/phone-mockup-iphone8plusspacegrey-portrait.png';
    const tabletPicUrl = 'https://i.ibb.co/8rMd0Zp/Dash-Board-Tablet-ipadair2-spacegrey-portrait.png';
    const monitorPicUrl = 'https://i.ibb.co/yN3VwTc/Dash-Board-Monitour-macbookgrey-front.png';
    const ticketTableUrl = 'https://i.ibb.co/5hDp4Kc/tcket-table.png';
    const otherImageUrl = 'https://i.ibb.co/p46JmJR/screenshot-other.png';
    const ticketDetailsUrl = 'https://i.ibb.co/MVgDKT3/ticket-details.png';
    const cardStyles = {backgroundColor: 'rgba(255,159,64,0.0)'};
    const textStyles = {fontWeight: 'bold', fontSize: '1.2rem'} as CSSProperties;
    useEffect(() => {

    }, [])
    return (
        <motion.div variants={routerVariant}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <div>
                <Row justify={'center'}>
                    <h1>Landing page </h1>
                </Row>
                <Row justify={'center'}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Card style={cardStyles} title={''}>
                            <Row justify={'center'}>
                                <Text style={textStyles}>Looks great on Mobile</Text>
                            </Row>
                            <Image
                                width={'100%'}
                                src={phonePicUrl}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Card style={cardStyles} title={''}>
                            <Row justify={'center'}>
                                <Text style={textStyles}>Looks great on Tablet</Text>
                            </Row>
                            <Image
                                width={'100%'}
                                src={tabletPicUrl}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row justify={'center'}>
                    <Col xs={24} lg={24}>
                        <Image
                            width={'100%'}
                            src={monitorPicUrl}
                        />
                    </Col>
                </Row>
                other
                <Row justify={'center'}>
                    <Col xs={12} lg={12}>
                        <Image
                            width={'100%'}
                            src={ticketTableUrl}
                        />
                    </Col>
                    <Col xs={12} lg={12}>
                        <Image
                            width={'100%'}
                            src={otherImageUrl}
                        />
                    </Col>
                    <Col xs={12} lg={12}>
                        <Image
                            width={'100%'}
                            src={ticketDetailsUrl}
                        />
                    </Col>
                </Row>
            </div>
        </motion.div>
    )
}

export {LandingPage}
