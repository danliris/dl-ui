module.exports = [
    {
        route: 'production/spinning/material-type',
        name: 'material-type',
        moduleId: './modules/production/spinning/material-type/index',
        nav: true,
        title: 'Master Material',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
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
        route: 'production/spinning/machine-output-monitoring-blowing',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring-blowing/index',
        nav: true,
        title: 'Pencatatan Output Mesin Blowing',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-output-monitoring-carding',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring-carding/index',
        nav: true,
        title: 'Pencatatan Output Mesin Carding',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-output-monitoring-predrawing',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring-predrawing/index',
        nav: true,
        title: 'Pencatatan Output Mesin Pre-Drawing',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-output-monitoring-lapformer',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring-lapformer/index',
        nav: true,
        title: 'Pencatatan Output Mesin Lap Former',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-output-monitoring-combing',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring-combing/index',
        nav: true,
        title: 'Pencatatan Output Mesin Combing',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-output-monitoring-mixdrawing',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring-mixdrawing/index',
        nav: true,
        title: 'Pencatatan Output Mesin Mix Drawing',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-output-monitoring-drawingbreaker',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring-drawingbreaker/index',
        nav: true,
        title: 'Pencatatan Output Mesin Drawing Breaker',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-output-monitoring-finishdrawing',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring-finishdrawing/index',
        nav: true,
        title: 'Pencatatan Output Mesin Finish Drawing',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-output-monitoring-flyer',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring-flyer/index',
        nav: true,
        title: 'Pencatatan Output Mesin Flyer',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-output-monitoring-ringspinning',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring-ringspinning/index',
        nav: true,
        title: 'Pencatatan Output Mesin Ring Spinning',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/machine-output-monitoring-winder',
        name: 'machine-output-monitoring',
        moduleId: './modules/production/spinning/machine-output-monitoring-winder/index',
        nav: true,
        title: 'Pencatatan Output Mesin Winder',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/reports/machine-report',
        name: 'machine-report',
        moduleId: './modules/production/spinning/reports/machine-report/index',
        nav: true,
        title: 'Laporan Mesin Produksi',
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
        route: 'production/spinning/lot-configuration-mix-drawing',
        name: 'lot-configuration',
        moduleId: './modules/production/spinning/lot-configuration-mix-drawing/index',
        nav: true,
        title: 'Konfigurasi Lot Mix Drawing',
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
            // permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration-blowing',
        name: 'count-configuration-blowing',
        moduleId: './modules/production/spinning/count-configuration-blowing/index',
        nav: true,
        title: 'Konfigurasi Count Blowing',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration-carding',
        name: 'count-configuration-carding',
        moduleId: './modules/production/spinning/count-configuration-carding/index',
        nav: true,
        title: 'Konfigurasi Count Carding',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration-predrawing',
        name: 'count-configuration-predrawing',
        moduleId: './modules/production/spinning/count-configuration-predrawing/index',
        nav: true,
        title: 'Konfigurasi Count Pre-Drawing',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration-lapformer',
        name: 'count-configuration-lapformer',
        moduleId: './modules/production/spinning/count-configuration-lapformer/index',
        nav: true,
        title: 'Konfigurasi Count Lap Former',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration-combing',
        name: 'count-configuration-combing',
        moduleId: './modules/production/spinning/count-configuration-combing/index',
        nav: true,
        title: 'Konfigurasi Count Combing',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration-mixdrawing',
        name: 'count-configuration-mixdrawing',
        moduleId: './modules/production/spinning/count-configuration-mixdrawing/index',
        nav: true,
        title: 'Konfigurasi Count Mix Drawing',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration-drawingbreaker',
        name: 'count-configuration-drawingbreaker',
        moduleId: './modules/production/spinning/count-configuration-drawingbreaker/index',
        nav: true,
        title: 'Konfigurasi Count Drawing Breaker',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration-finishdrawing',
        name: 'count-configuration-finishdrawing',
        moduleId: './modules/production/spinning/count-configuration-finishdrawing/index',
        nav: true,
        title: 'Konfigurasi Count Finish Drawing',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration-flyer',
        name: 'count-configuration-flyer',
        moduleId: './modules/production/spinning/count-configuration-flyer/index',
        nav: true,
        title: 'Konfigurasi Count Flyer',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration-ringspinning',
        name: 'count-configuration-ringspinning',
        moduleId: './modules/production/spinning/count-configuration-ringspinning/index',
        nav: true,
        title: 'Konfigurasi Count Ring Spinning',
        auth: true,
        settings: {
            group: "spinning",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'production/spinning/count-configuration-winder',
        name: 'count-configuration-winder',
        moduleId: './modules/production/spinning/count-configuration-winder/index',
        nav: true,
        title: 'Konfigurasi Count Winder',
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
    // },
    // {
    //     route: 'production/spinning/grain-calculation',
    //     name: 'grain-calculation',
    //     moduleId: './modules/production/spinning/grain-calculation/index',
    //     nav: true,
    //     title: 'Perhitungan Check Grain',
    //     auth: true,
    //     settings: {
    //         group: "spinning",
    //         permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     }
    }
]
