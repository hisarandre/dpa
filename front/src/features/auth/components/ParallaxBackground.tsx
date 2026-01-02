import {motion, MotionValue} from "framer-motion";

const LOGO_CONFIG = {
    size: '150vmax',
    minSize: '1800px',
    opacity: 0.2,
    path: '/src/assets/images/logo.svg'
}

function ParallaxBackground({ parallaxX, parallaxY }: {
    parallaxX: MotionValue<number>,
    parallaxY: MotionValue<number>
}) {
    return (
        <motion.div
            className="hidden md:flex fixed inset-0 pointer-events-none items-center justify-start"
            style={{
                x: parallaxX,
                y: parallaxY,
                left: '-40%',
                top: '-30%',
                width: '200%',
            }}
        >
            <div
                className="bg-no-repeat bg-center"
                style={{
                    width: LOGO_CONFIG.size,
                    height: LOGO_CONFIG.size,
                    minWidth: LOGO_CONFIG.minSize,
                    minHeight: LOGO_CONFIG.minSize,
                    backgroundImage: `url(${LOGO_CONFIG.path})`,
                    backgroundSize: 'contain',
                    opacity: LOGO_CONFIG.opacity,
                }}
            />
        </motion.div>
    )
}

export { ParallaxBackground }
