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
            roles: ["admin"],
            iconClass: 'fa fa-dashboard'
        }
    }]