module.exports = [
    {
        route: 'packing-receipt',
        name: 'packing-receipt',
        moduleId: './modules/inventory/packing-receipt/index',
        nav: true,
        title: 'Penerimaan Packing Gudang Jadi',
        auth: true,
        settings: {
            group: "inventory",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    }
] 
