module.exports = [
    {
        route: 'marketing/kanban',
        name: 'kanban',
        moduleId: './modules/marketing/kanban/index',
        nav: true,
        title: 'Kanban',
        auth: true,
        settings: {
            group: "Marketing",
            permission: { "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }]