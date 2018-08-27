module.exports = [
    {
        route: '/sp-master-plan/standard-minute-value',
        name: 'standard-capacity',
        moduleId: './modules/sp-master-plan/standard-capacity/index',
        nav: true,
        title: 'Kapasitas Produksi',
        auth: true,
        settings: {
            group: "sp-master-plan",
            //permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }

]
