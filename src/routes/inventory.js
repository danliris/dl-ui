module.exports = [
    {
        route: 'inventory/inventory-documents',
        name: 'accounts',
        moduleId: './modules/inventory/inventory-document/index',
        nav: true,
        title: 'Dokumen Inventory',
        auth: true,
        settings: {
            group: "Inventory",
            permission : {"C9":1},
            iconClass: 'fa fa-dashboard'
        }
    }]
