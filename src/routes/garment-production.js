module.exports = [
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
    }
];