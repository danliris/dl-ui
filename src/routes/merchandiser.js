module.exports = [
    {
        route: '/merchandiser/garment-pre-sales-contract',
        name: 'garment-pre-sales-contract',
        moduleId: './modules/merchandiser/garment-pre-sales-contract/index',
        nav: true,
        title: 'Pre Sales Contract - Garment',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
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
        route: '/merchandiser/cost-calculation-approval/md',
        name: 'cost-calculation-approval-md',
        moduleId: './modules/merchandiser/cost-calculation-approval/index',
        nav: true,
        title: 'Cost Calculation Approval - MD',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-calculator',
            type: "md"
        }
    },
    {
        route: '/merchandiser/cost-calculation-approval/purchasing',
        name: 'cost-calculation-approval-purchasing',
        moduleId: './modules/merchandiser/cost-calculation-approval/index',
        nav: true,
        title: 'Cost Calculation Approval - Purchasing',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-calculator',
            type: "purchasing"
        }
    },
    {
        route: '/merchandiser/cost-calculation-approval/ie',
        name: 'cost-calculation-approval-ie',
        moduleId: './modules/merchandiser/cost-calculation-approval/index',
        nav: true,
        title: 'Cost Calculation Approval - IE',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-calculator',
            type: "ie"
        }
    },
    {
        route: '/merchandiser/cost-calculation-approval/ppic',
        name: 'cost-calculation-approval-ppic',
        moduleId: './modules/merchandiser/cost-calculation-approval/index',
        nav: true,
        title: 'Cost Calculation Approval - PPIC',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-calculator',
            type: "ppic"
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
        title: 'Validasi RO PPIC',
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
        title: 'Sales Contract Per RO',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/merchandiser/garment-purchase-request-master',
        name: 'purchase-request-master',
        moduleId: './modules/merchandiser/garment-purchase-request-master/index',
        nav: true,
        title: 'PR Master',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C9": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/merchandiser/approve-pr-master',
        name: 'approve-purchase-request-master',
        moduleId: './modules/merchandiser/approve-pr-master/index',
        nav: true,
        title: 'Approve PR Master',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C9": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/merchandiser/ro-sample-validation',
        name: 'ro-sample-validation',
        moduleId: './modules/merchandiser/ro-sample-validation/index',
        nav: true,
        title: 'Validasi RO Sample',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C9": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
    {
        route: '/merchandiser/ro-acceptance',
        name: 'ro-acceptance',
        moduleId: './modules/merchandiser/ro-acceptance/index',
        nav: true,
        title: 'Penerimaan RO',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C9": 1 },
            iconClass: 'fa fa-calculator'
        }
    },
];
