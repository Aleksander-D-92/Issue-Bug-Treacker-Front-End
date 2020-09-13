import React, {CSSProperties, useEffect} from "react";
import {motion, Variants} from "framer-motion";
import {BackTop, Card, Col, Image, Row, Typography} from 'antd';
import ScrollAnimation from 'react-animate-on-scroll';
import {ScrollToBottom} from "./ScrollToBottom";
import {VerticalAlignBottomOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;

function LandingPage() {
    const phonePicUrl = 'https://i.ibb.co/1Tf0S7v/phone-mockup-iphone8plusspacegrey-portrait.png';
    const tabletPicUrl = 'https://i.ibb.co/8rMd0Zp/Dash-Board-Tablet-ipadair2-spacegrey-portrait.png';
    const monitorPicUrl = 'https://i.ibb.co/yN3VwTc/Dash-Board-Monitour-macbookgrey-front.png';
    const ticketTableUrl = 'https://i.ibb.co/5hDp4Kc/tcket-table.png';
    const assignQaImageUrl = 'https://i.ibb.co/p46JmJR/screenshot-other.png';
    const ticketDetailsUrl = 'https://i.ibb.co/MVgDKT3/ticket-details.png';
    const cardStyles = {
        backgroundColor: 'rgba(255,159,64,0.0)'
    } as CSSProperties;
    const textStyles = {
        fontWeight: 'bold',
        fontSize: '1.2rem'
    } as CSSProperties;
    const landingPageVariants = {
        initial: {
            x: 0,
            opacity: 1
        },
        animate: {
            x: 0, y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0,
                duration: 0
            }
        },
        exit: {
            x: '70vw', opacity: 0,
            transition: {
                delay: 0, ease: 'easeInOut', duration: 0.3
            }
        }
    } as Variants
    useEffect(() => {

    }, [])
    return (
        <motion.div variants={landingPageVariants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
        >
            <ScrollToBottom/>
            <Row justify={'center'}>
                <Title>Responsive website design</Title>
            </Row>
            <Row justify={'center'}>
            </Row>

            <Row justify={'center'}>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <ScrollAnimation animateIn="fadeInLeft">
                        <Card style={cardStyles} title={''}>
                            <Row justify={'center'}>
                                <Text style={textStyles}>Looks great on Mobile</Text>
                            </Row>
                            <Image
                                width={'100%'}
                                src={phonePicUrl}
                            />
                        </Card>
                    </ScrollAnimation>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <ScrollAnimation animateIn="fadeInRight">
                        <Card style={cardStyles} title={''}>
                            <Row justify={'center'}>
                                <Text style={textStyles}>Looks great on Tablet</Text>
                            </Row>
                            <Image
                                width={'100%'}
                                src={tabletPicUrl}
                            />
                        </Card>
                    </ScrollAnimation>
                </Col>
            </Row>
            <Row justify={'center'} className={'mt-3'}>
                <Col xs={24} lg={24}>
                    <ScrollAnimation animateIn="fadeInLeft">
                        <Image
                            width={'100%'}
                            src={monitorPicUrl}
                        />
                    </ScrollAnimation>
                </Col>
            </Row>

            <Row justify={'center'} className={'mt-5'}>
                <Title>Easy to use/intuitive interface</Title>
            </Row>

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
                        src={assignQaImageUrl}
                    />
                </Col>
                   <Col xs={12} lg={12}>
                    <Image
                        width={'100%'}
                        src={ticketDetailsUrl}
                    />
                </Col>
                <div id={'12232'}></div>
            </Row>
            <BackTop style={{transform: 'scale(2)'}}/>
        </motion.div>
    )
}

export {LandingPage}
