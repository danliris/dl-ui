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
    }
]