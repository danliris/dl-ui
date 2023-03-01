module.exports = [
    {
        route: "/dashboard-dp/main",
        name: "Daily Operation Mesin - Unggah File",
        moduleId: "./modules/dashboard-dp/main/index",
        nav: true,
        title: "Unggah File",
        auth: true,
        settings: {
          group: "daily-operation-mesin",
          permission: { C9: 1, B1: 1, B12: 1 },
          iconClass: "fa fa-dashboard",
        },
    },
]