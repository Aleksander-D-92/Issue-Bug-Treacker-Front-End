import React, {CSSProperties} from "react";
import {Row, Typography} from "antd";

const {Text} = Typography;


function FooterText() {
    const footerTextStyle = {
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: 'bold'
    } as CSSProperties

    return (
        <Row justify={'center'}>
            <Text style={footerTextStyle}>2020 @Destroy Bugs An
                <Text style={footerTextStyle}>
                    <a href="https://app.netlify.com/sites/destroy-bugs/deploys"
                       style={{color: '#d93a3d'}}> Alexander D.</a>
                </Text>
                <Text style={footerTextStyle}> Production.</Text>
            </Text>
        </Row>
    )
}

export {FooterText}
