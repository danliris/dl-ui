module.exports = [
    {
        route: '/garment-master-plan/working-hours-standard',
        name: 'working-hours-standard',
        moduleId: './modules/garment-master-plan/working-hours-standard/index',
        nav: true,
        title: 'Standar Jam Kerja',
        auth: true,
        settings: {
            group: "g-master-plan",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }

]