import {Variants} from "framer-motion";

const transparentColors = {
    red: 'rgba(255,99,132,0.6)',
    green: 'rgba(75,192,192,0.6)',
    blue: 'rgba(54,162,235,0.6)',
    yellow: 'rgba(255,206,86,0.6)',
    purple: 'rgba(153,102,255,0.6)',
    orange: 'rgba(255,159,64,0.6)'
}
const solidColors = {
    red: 'rgba(255,99,132,1)',
    green: 'rgba(75,192,192,1)',
    blue: 'rgba(54,162,235,1)',
    yellow: 'rgba(255,206,86,1)',
    purple: 'rgba(153,102,255,1)',
    orange: 'rgba(255,159,64,1)'
}
const routerVariant = {
    initial: {
        x: '-60vw',
        opacity: 0
    },
    animate: {
        x: 0, y: 0, opacity: 1, scale: 1,
        transition: {
            delay: 0,
            duration: 0.3
        }
    },
    exit: {
        x: '70vw', opacity: 0,
        transition: {
            delay: 0, ease: 'easeInOut', duration: 0.3
        }
    },
} as Variants
export {transparentColors, solidColors, routerVariant}
