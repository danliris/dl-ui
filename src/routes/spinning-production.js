module.exports = [
    {
        route: 'production/spinning/yarn-output-production',
        name: 'yarn-output-production',
        moduleId: './modules/production/spinning/yarn-output-production/index',
        nav: true,
        title: 'Output Produksi Winder',
        auth: true,
        settings: {
            group: "spinning",
            // permission: { "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
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
            group: "spinning",
            // permission: { "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
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
            group: "spinning",
            // permission: { "S1": 1, "S2": 1, "S3": 1, "S4": 1},
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
            group: "spinning",
            // permission: { "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-input',
        name: 'machine-input',
        moduleId: './modules/production/spinning/machine-input/index',
        nav: true,
        title: 'Pencatatan Input Produksi Spinning',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-output-monitoring',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring/index',
        nav: true,
        title: 'Pencatatan Output Mesin',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/lot-configuration',
        name: 'lot-configuration',
        moduleId: './modules/production/spinning/lot-configuration/index',
        nav: true,
        title: 'Konfigurasi Lot',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration',
        name: 'count-configuration',
        moduleId: './modules/production/spinning/count-configuration/index',
        nav: true,
        title: 'Konfigurasi Count',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/spinning-quality',
        name: 'spinning-quality',
        moduleId: './modules/production/spinning/spinning-quality/index',
        nav: true,
        title: 'Master Standar Kualitas',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
]
