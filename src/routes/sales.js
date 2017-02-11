module.exports = [
    {
        route: 'sales/production-order',
        name: 'production-order',
        moduleId: './modules/sales/production-order/index',
        nav: true,
        title: 'Production Order',
        auth: true,
        settings: {
            group: "sales",
            permission: {"*":0},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'sales/reports/production-order-reports',
        name: 'production-order-report',
        moduleId: './modules/sales/reports/production-order-report/index',
        nav: true,
        title: 'Monitoring Surat Order Produksi',
        auth: true,
        settings: {
            group: "sales",
            permission: {},
            iconClass: 'fa fa-dashboard'
        }
    }
];
