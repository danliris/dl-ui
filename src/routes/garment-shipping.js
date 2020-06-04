module.exports=[
    
    {
        route: "garment-shipping/packing-list",
        name: "garment-shipping/packing-list",
        moduleId: "modules/garment-shipping/packing-list/index",
        nav: true,
        title: "Packing List",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    }
]