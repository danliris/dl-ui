module.exports = [
    {
        route: 'production/spinning/yarn-output-production',
        name: 'yarn-output-production',
        moduleId: './modules/production/spinning/yarn-output-production/index',
        nav: true,
        title: 'Output Produksi Winder',
        auth: true,
        settings: {
            group: "s-production",
            permission: { "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/spinning-input',
        name: 'spinning-input-production',
        moduleId: './modules/production/spinning/spinning-input/index',
        nav: true,
        title: 'Input Produksi Winder',
        auth: true,
        settings: {
            group: "s-production",
            permission: { "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/yarn-output-production-report',
        name: 'yarn-output-productions-report',
        moduleId: './modules/production/spinning/reports/yarn-output-productions-report/index',
        nav: true,
        title: 'Laporan Output Produksi Winder',
        auth: true,
        settings: {
            group: "s-production",
            permission: { "S1": 1, "S2": 1, "S3": 1, "S4": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/spinning-input-report',
        name: 'spinning-input-production-report',
        moduleId: './modules/production/spinning/spinning-input-report/index',
        nav: true,
        title: 'Laporan Input Produksi Winder',
        auth: true,
        settings: {
            group: "s-production",
            permission: { "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
]
