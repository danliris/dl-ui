module.exports = [
    {
        route: '/garment-production/comodity-price',
        name: 'comodity-price',
        moduleId: './modules/garment-production/comodity-price/index',
        nav: true,
        title: 'Master Tarif',
        auth: true,
        settings: {
            group: "g-production",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/preparing',
        name: 'preparing',
        moduleId: './modules/garment-production/preparing/index',
        nav: true,
        title: 'Preparing',
        auth: true,
        settings: {
            group: "g-production",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/delivery-return',
        name: 'garment-production-delivery-return',
        moduleId: './modules/garment-production/delivery-return/index',
        nav: true,
        title: 'Retur Proses',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/aval-product',
        name: 'aval-product',
        moduleId: './modules/garment-production/aval-product/index',
        nav: true,
        title: 'Barang Aval',
        auth: true,
        settings: {
            group: "g-production",
            permission: { "C9": 1, "S1": 1, "S2": 1, "S3": 1, "S4": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/cutting-in',
        name: 'garment-production-cutting-in',
        moduleId: './modules/garment-production/cutting-in/index',
        nav: true,
        title: 'Cutting-In',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/cutting-out',
        name: 'garment-production-cutting-out',
        moduleId: './modules/garment-production/cutting-out/index',
        nav: true,
        title: 'Cutting-Out',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/subcon-cutting-out',
        name: 'garment-production-subcon-cutting-out',
        moduleId: './modules/garment-production/subcon-cutting-out/index',
        nav: true,
        title: 'Cutting-Out Subkon',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-do',
        name: 'garment-production-sewing-do',
        moduleId: './modules/garment-production/sewing-do/index',
        nav: true,
        title: 'Sewing DO',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/loading',
        name: 'garment-production-loading',
        moduleId: './modules/garment-production/loading/index',
        nav: true,
        title: 'Loading',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-in',
        name: 'garment-production-sewing-in',
        moduleId: './modules/garment-production/sewing-in/index',
        nav: true,
        title: 'Sewing In',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/sewing-out',
        name: 'garment-production-sewing-out',
        moduleId: './modules/garment-production/sewing-out/index',
        nav: true,
        title: 'Sewing Out',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/finishing-in',
        name: 'garment-production-finishing-in',
        moduleId: './modules/garment-production/finishing-in/index',
        nav: true,
        title: 'Finishing In',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/aval-component',
        name: 'garment-production-aval-component',
        moduleId: './modules/garment-production/aval-component/index',
        nav: true,
        title: 'Aval Komponen',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-prepare',
        name: 'garment-production-monitoring-prepare',
        moduleId: './modules/garment-production/monitoring-prepare/index',
        nav: true,
        title: 'Monitoring Prepare',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-cutting',
        name: 'garment-production-monitoring-cutting',
        moduleId: './modules/garment-production/monitoring-cutting/index',
        nav: true,
        title: 'Monitoring Cutting',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-production/monitoring-loading',
        name: 'garment-production-monitoring-cutting',
        moduleId: './modules/garment-production/monitoring-loading/index',
        nav: true,
        title: 'Monitoring Loading',
        auth: true,
        settings: {
            group: "g-production",
            permission: {"C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    }
];