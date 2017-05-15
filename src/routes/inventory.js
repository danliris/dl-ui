module.exports = [
    {
        route: 'inventory/inventory-documents',
        name: 'inventory/inventory-documents',
        moduleId: './modules/inventory/inventory-document/index',
        nav: true,
        title: 'Dokumen Inventory',
        auth: true,
        settings: {
            group: "Inventory",
            permission : {"C9":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/inventory-stock-report',
        name: 'inventory/reports/inventory-stock-report',
        moduleId: './modules/inventory/reports/inventory-movement-report/index',
        nav: true,
        title: 'Inventory Movement Report',
        auth: true,
        settings: {
            group: "Inventory",
            permission : {"C9":1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/inventory-summary-report',
        name: 'inventory/reports/inventory-summary-report',
        moduleId: './modules/inventory/reports/inventory-summary-report/index',
        nav: true,
        title: 'Inventory Summary Report',
        auth: true,
        settings: {
            group: "Inventory",
            permission : {"C9":1},
            iconClass: 'fa fa-dashboard'
        }
    }]
