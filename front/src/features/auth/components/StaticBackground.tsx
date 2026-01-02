const LOGO_CONFIG = {
    size: '150vmax',
    minSize: '1800px',
    opacity: 0.2,
    path: '/src/assets/images/logo.svg'
}

// Logo de fond statique (mobile)
function StaticBackground() {
    return (
        <div
            className="block md:hidden fixed inset-0 pointer-events-none flex items-center justify-start"
            style={{ left: '-240%', width: '200%' }}
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
        </div>
    )
}

export { StaticBackground }
