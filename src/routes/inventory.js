module.exports = [
    {
        route: 'inventory/packing-receipt',
        name: 'packing-receipt',
        moduleId: './modules/inventory/packing-receipt/index',
        nav: true,
        title: 'Penerimaan Packing Gudang Jadi',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/inventory-documents',
        name: 'inventory/inventory-documents',
        moduleId: './modules/inventory/inventory-document/index',
        nav: true,
        title: 'Dokumen Inventory',
        auth: true,
        settings: {
            group: "Inventory",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/inventory-movement-report',
        name: 'inventory/reports/inventory-movement-report',
        moduleId: './modules/inventory/reports/inventory-movement-report/index',
        nav: true,
        title: 'Laporan Stock In/Out',
        auth: true,
        settings: {
            group: "Inventory",
            permission : {"*":0},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'inventory/reports/inventory-summary-report',
        name: 'inventory/reports/inventory-summary-report',
        moduleId: './modules/inventory/reports/inventory-summary-report/index',
        nav: true,
        title: 'Kartu Stok',
        auth: true,
        settings: {
            group: "Inventory",
            permission : {"*":0},
            iconClass: 'fa fa-dashboard'
        }
    }, 
    {
        route: 'inventory/reports/fp-packing-receipt-report',
        name: 'inventory/reports/fp-packing-receipt-report',
        moduleId: './modules/inventory/reports/fp-packing-receipt-report/index',
        nav: true,
        title: 'Laporan Penerimaan Packing',
        auth: true,
        settings: {
            group: "Inventory",
            permission : {"F1": 1, "F2": 1, "C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    }]
