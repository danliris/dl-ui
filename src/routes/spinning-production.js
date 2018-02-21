module.exports = [
    {
        route: 'production/spinning/yarn-output-production',
        name: 'yarn-output-production',
        moduleId: './modules/production/spinning/yarn-output-production/index',
        nav: true,
        title: 'Output Produksi Spinning',
        auth: true,
        settings: {
            group: "s-production",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/spinning-input',
        name: 'yarn-output-production',
        moduleId: './modules/production/spinning/spinning-input/index',
        nav: true,
        title: 'Input Produksi Spinning',
        auth: true,
        settings: {
            group: "s-production",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/yarn-output-production-report',
        name: 'yarn-output-productions-report',
        moduleId: './modules/production/spinning/reports/yarn-output-productions-report/index',
        nav: true,
        title: 'Laporan Output Produksi Spinning',
        auth: true,
        settings: {
            group: "s-production",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
]