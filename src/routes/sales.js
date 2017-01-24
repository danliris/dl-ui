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
            permission: {"*": 0},
            iconClass: 'fa fa-dashboard'
        }
    }
];