module.exports = [
    {
        route: '/int-purchasing/transfer-request',
        name: 'transfer-request',
        moduleId: './modules/int-purchasing/transfer-request/index',
        nav: true,
        title: 'Transfer Request',
        auth: true,
        settings: {
            group: "int-purchasing",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/int-purchasing/transfer-request-report',
        name: 'transfer-request-report',
        moduleId: './modules/int-purchasing/transfer-request-report/index',
        nav: true,
        title: 'Laporan Transfer Request',
        auth: true,
        settings: {
            group: "int-purchasing",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
]