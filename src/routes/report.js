module.exports = [
    {
        route: 'power-bi/purchasing',
        name: 'power-bi-purchasing',
        moduleId: './modules/power-bi/purchasing/index',
        nav: true,
        title: 'Power BI: Purchasing Reports',
        auth: true,
        settings: {
            group: "reports",
            permission : {"P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "C9": 1, "PG": 7},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'power-bi/production',
        name: 'power-bi-production',
        moduleId: './modules/power-bi/production/index',
        nav: true,
        title: 'Power BI: Production Reports',
        auth: true,
        settings: {
            group: "reports",
            permission : {"C9": 1, "F1": 7, "F2": 7},
            iconClass: 'fa fa-dashboard'
        }
    },{
        route: 'power-bi/sales',
        name: 'power-bi-sales',
        moduleId: './modules/power-bi/sales/index',
        nav: true,
        title: 'Power BI: Sales Reports',
        auth: true,
        settings: {
            group: "reports",
            permission : {"A2":7,"C9":1},
            iconClass: 'fa fa-dashboard'
        }
    }]
