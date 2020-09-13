import React, {useEffect} from "react";
import {motion, Variants} from "framer-motion";
import {BackTop, Col, Row, Typography} from 'antd';
import {ScrollToBottom} from "./ScrollToBottom";
import './css/LandingPageCss.css'
import {LandingPageImage} from "./LandingPageImage";

const {Title} = Typography;

function LandingPageView() {
    const phonePicUrl = 'https://i.ibb.co/1Tf0S7v/phone-mockup-iphone8plusspacegrey-portrait.png';
    const tabletPicUrl = 'https://i.ibb.co/8rMd0Zp/Dash-Board-Tablet-ipadair2-spacegrey-portrait.png';
    const monitorPicUrl = 'https://i.ibb.co/yN3VwTc/Dash-Board-Monitour-macbookgrey-front.png';
    const ticketTableUrl = 'https://i.ibb.co/5hDp4Kc/tcket-table.png';
    const assignQaImageUrl = 'https://i.ibb.co/p46JmJR/screenshot-other.png';
    const ticketDetailsUrl = 'https://i.ibb.co/hVk2FVJ/ticket-details.png';
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
                    <LandingPageImage description={'Looks great on Mobile'}
                                      imageUrl={phonePicUrl}
                                      animateIn={'fadeInLeft'}/>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <LandingPageImage description={'Looks great on Tablet'}
                                      imageUrl={tabletPicUrl}
                                      animateIn={'fadeInRight'}/>
                </Col>
            </Row>
            <Row justify={'center'} className={'mt-3'}>
                <Col xs={24} lg={24}>
                    <LandingPageImage description={''}
                                      imageUrl={monitorPicUrl}
                                      animateIn={'fadeInLeft'}/>
                </Col>
            </Row>

            <Row justify={'center'} className={'mt-5'}>
                <Title>Easy to use and intuitive interface</Title>
            </Row>

            <Row justify={'center'}>
                <Col xs={12} lg={12}>
                    <LandingPageImage description={'All of your tickets in one place'}
                                      imageUrl={ticketTableUrl}
                                      animateIn={'fadeInLeft'}/>
                </Col>

                <Col xs={12} lg={12}>
                    <LandingPageImage description={'You can assign any QA to any project'}
                                      imageUrl={assignQaImageUrl}
                                      animateIn={'fadeInRight'}/>
                </Col>

                <Col xs={24} lg={24}>
                    <LandingPageImage description={'Details for each ticket, comments and it\'s history'}
                                      imageUrl={ticketDetailsUrl}
                                      animateIn={'flipInY'}/>
                </Col>
            </Row>
            <div id={'12232'}></div>
            <BackTop style={{transform: 'scale(2)'}}/>
        </motion.div>
    )
}

export {LandingPageView}
