module.exports = [
    {
        route: 'packing-sku-inventory/product-sku',
        name: 'product-sku',
        moduleId: './modules/packing-sku-inventory/product-sku/index',
        nav: true,
        title: 'Barang SKU',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/product-packing',
        name: 'product-packing',
        moduleId: './modules/packing-sku-inventory/product-packing/index',
        nav: true,
        title: 'Barang Packing',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/inventory-document-sku',
        name: 'product-packing',
        moduleId: './modules/packing-sku-inventory/inventory-document-sku/index',
        nav: true,
        title: 'Dokument Inventori SKU',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/inventory-document-packing',
        name: 'product-packing',
        moduleId: './modules/packing-sku-inventory/inventory-document-packing/index',
        nav: true,
        title: 'Dokumen Inventori Packing',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/dyeing-printing-area-movement',
        name: 'dyeing-printing-area-movement',
        moduleId: './modules/packing-sku-inventory/dyeing-printing-area-movement/index',
        nav: true,
        title: 'Inspection Material Dyeing/Printing',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/transit-area-note',
        name: 'transit-area-note',
        moduleId: './modules/packing-sku-inventory/transit-area-note/index',
        nav: true,
        title: 'Bon Transit Area Dyeing/Printing',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
];