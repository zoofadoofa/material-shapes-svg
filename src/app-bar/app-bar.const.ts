const denseSpecs = {
    height: 48,
    heightToCenter: 24,
    cutChamferRadius: 4,
    padding: {
        top: 12,
        right: 16,
        bottom: 12,
        left: 16,
    },
    fab: {
        diameter: 56,
        radius: 28,
        cutMargin: 8,
    },
    action: {
        marginBetweenActions: 24,
        layout: {
            fabCenter: {
                actionAlign: 'flex-end',
                actionMin: 1,
                actionMax: 2
            },
            fabEnd: {
                actionAlign: 'flex-start',
                actionMin: 2,
                actionMax: 4
            },
            fabPositionNone: {
                actionAlign: 'flex-end',
                actionMin: 2,
                actionMax: 4
            }
        }
    }
};

const normalSpecs = {
    height: 56,
    heightToCenter: 28,
    cutChamferRadius: 4,
    padding: {
        top: 16,
        right: 16,
        bottom: 16,
        left: 16,
    },
    fab: {
        diameter: 56,
        radius: 28,
        cutMargin: 8,
    },
    action: {
        marginBetweenActions: 24,
        layout: {
            fabCenter: {
                actionAlign: 'flex-end',
                actionMin: 1,
                actionMax: 2,
            },
            fabEnd: {
                actionAlign: 'flex-start',
                actionMin: 2,
                actionMax: 4
            },
            fabPositionNone: {
                actionAlign: 'flex-end',
                actionMin: 2,
                actionMax: 4
            }
        }
    }
};

const looseSpecs = {
    height: 64,
    heightToCenter: 32,
    cutChamferRadius: 4,
    padding: {
        top: 20,
        right: 24,
        bottom: 20,
        left: 24
    },
    fab: {
        diameter: 56,
        radius: 28,
        cutMargin: 8
    },
    action: {
        marginBetweenActions: 24,
        layout: {
            fabCenter: {
                actionAlign: 'flex-end',
                actionMin: 1,
                actionMax: 2
            },
            fabEnd: {
                actionAlign: 'flex-start',
                actionMin: 2,
                actionMax: 4
            },
            fabPositionNone: {
                actionAlign: 'flex-end',
                actionMin: 2,
                actionMax: 4
            }
        }
    }
};

export type FabPosition = 'end' | 'center';

export const AppBarBottomSpecs = {
    mobile: {
        portrait: normalSpecs,
        landscape: denseSpecs,
    },
    tablet: {
        portrait: looseSpecs,
        landscape: normalSpecs
    },
    desktop: {
        portrait: denseSpecs,
        landscape: denseSpecs
    }
};
