module.exports = [
    {
        route: 'sales/production-order',
        name: 'production-order',
        moduleId: './modules/sales/production-order/index',
        nav: true,
        title: 'Surat Perintah Produksi',
        auth: true,
        settings: {
            group: "sales",
            permission: { "A2": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'sales/production-order-list-view',
        name: 'production-order-list-view',
        moduleId: './modules/sales/production-order-list-view/index',
        nav: true,
        title: 'Surat Perintah Produksi',
        auth: true,
        settings: {
            group: "sales",
            permission: { "F1": 1, "F2": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'sales/reports/production-order-reports',
        name: 'production-order-report',
        moduleId: './modules/sales/reports/production-order-report/index',
        nav: true,
        title: 'Monitoring Surat Perintah Produksi',
        auth: true,
        settings: {
            group: "sales",
            permission: { "A2": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'sales/weaving-sales-contract',
        name: 'weaving-sales-contract',
        moduleId: './modules/sales/weaving-sales-contract/index',
        nav: true,
        title: 'Sales Contract - Weaving',
        auth: true,
        settings: {
            group: "sales",
            permission: { "A2": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
];
