import React, {CSSProperties} from "react";
import ScrollAnimation from "react-animate-on-scroll";
import {Card, Image, Row, Typography} from "antd";

const {Text} = Typography;

interface Props {
    description: string
    imageUrl: string,
    animateIn: string
}

const cardStyles = {
    backgroundColor: 'rgba(255,159,64,0.0)',
    borderColor: 'rgba(255,159,64,0.0)'
} as CSSProperties;
const textStyles = {
    fontWeight: 'bold',
    fontSize: '1.2rem'
} as CSSProperties;

function LandingPageImage(props: Props) {
    return (
        <>
            <ScrollAnimation animateIn={props.animateIn}>
                <Card style={cardStyles} title={''}>
                    <Row justify={'center'}>
                        <Text style={textStyles}>{props.description}</Text>
                    </Row>
                    <Image className={'landingPageImage'}
                           width={'100%'}
                           src={props.imageUrl}
                    />
                </Card>
            </ScrollAnimation>
        </>
    )
}

export {LandingPageImage}
