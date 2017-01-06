module.exports = [
    {
        route: ['', 'Welcome'],
        name: 'welcome',
        moduleId: './welcome',
        nav: false,
        title: 'Home',
        auth: true,
        settings: {
            permission: { "*": 0 }

        }
    },
    {
        route: 'pr',
        name: 'purchase-request',
        moduleId: './modules/purchasing/purchase-request/index',
        nav: true,
        title: 'Purchase Request',
        auth: true,
        settings: {
            group: "general",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'pr/monitoring',
        name: 'purchase-request-monitoring',
        moduleId: './modules/purchasing/monitoring-purchase-request/index',
        nav: true,
        title: 'Monitoring Purchase Request',
        auth: true,
        settings: {
            group: "general",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'receipt-note/unit',
        name: 'receipt-note-unit',
        moduleId: './modules/purchasing/unit-receipt-note/index',
        nav: true,
        title: 'Bon Terima Unit',
        auth: true,
        settings: {
            group: "general",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'receipt-note/unit/monitoring',
        name: 'receipt-note-unit-monitoring',
        moduleId: './modules/purchasing/unit-receipt-note-monitoring/index',
        nav: true,
        title: 'Monitoring Bon Terima Unit',
        auth: true,
        settings: {
            group: "general",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }]