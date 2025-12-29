import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useCallback, type ReactNode } from 'react'
import { ParallaxBackground } from '@/features/auth/components/ParallaxBackground'
import { StaticBackground } from '@/features/auth/components/StaticBackground'

const PARALLAX_RANGE = 500
const PARALLAX_EFFECT = 50

const ANIMATION = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' as const }
}

interface AuthLayoutProps {
    children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const parallaxX = useTransform(
        mouseX,
        [-PARALLAX_RANGE, PARALLAX_RANGE],
        [-PARALLAX_EFFECT, PARALLAX_EFFECT]
    )
    const parallaxY = useTransform(
        mouseY,
        [-PARALLAX_RANGE, PARALLAX_RANGE],
        [-PARALLAX_EFFECT, PARALLAX_EFFECT]
    )

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (window.innerWidth >= 768) {
            mouseX.set(e.clientX - window.innerWidth / 2)
            mouseY.set(e.clientY - window.innerHeight / 2)
        }
    }, [mouseX, mouseY])

    return (
        <div
            className="relative min-h-screen overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <StaticBackground />
            <ParallaxBackground parallaxX={parallaxX} parallaxY={parallaxY} />

            <div
                className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/90 to-background/85"
                aria-hidden="true"
            />

            <motion.div
                className="relative z-10 flex min-h-screen items-center justify-center px-4 py-8"
                {...ANIMATION}
            >
                {children}
            </motion.div>
        </div>
    )
}