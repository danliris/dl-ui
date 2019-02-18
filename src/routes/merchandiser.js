module.exports = [
    {
        route: '/merchandiser/cost-calculation',
        name: 'cost-calculation',
        moduleId: './modules/merchandiser/cost-calculation/index',
        nav: true,
        title: 'Cost Calculation Export Garment',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/merchandiser/ro-garment',
        name: 'ro-garment',
        moduleId: './modules/merchandiser/ro-garment/index',
        nav: true,
        title: 'RO Export Garment',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/merchandiser/ro-garment-validation',
        name: 'ro-garment-validation',
        moduleId: './modules/merchandiser/ro-garment-validation/index',
        nav: true,
        title: 'Validasi RO Garment',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/merchandiser/garment-sales-contract',
        name: 'garment-sales-contract',
        moduleId: './modules/merchandiser/garment-sales-contract/index',
        nav: true,
        title: 'Sales Contract - Garment',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
];
