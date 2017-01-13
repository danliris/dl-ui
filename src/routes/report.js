module.exports = [
    {
        route: 'power-bi',
        name: 'power-bi',
        moduleId: './modules/power-bi/index',
        nav: true,
        title: 'Power BI Reports',
        auth: true,
        settings: {
            group: "reports",
            permission : {"P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7},
            iconClass: 'fa fa-dashboard'
        }
    }]
