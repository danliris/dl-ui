module.exports = [
    {
        route: 'Migration',
        name: 'Migration Log',
        moduleId: './modules/migration-log/monitoring-migration-log/index',
        nav: true,
        title: 'Migration-Log',
        auth: true,
        settings: {
            group: "Migration-Log",
            permission: {"C9":1},
            iconClass: 'fa fa-dashboard'
        }
    }
]
