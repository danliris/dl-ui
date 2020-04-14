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
        route: 'packing-sku-inventory/inspection-document-report',
        name: 'product-packing',
        moduleId: './modules/packing-sku-inventory/inspection-document-report/index',
        nav: true,
        title: 'Laporan Bon Inspection',
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
        route: 'packing-sku-inventory/inspection-im-balance',
        name: 'product-packing',
        moduleId: './modules/packing-sku-inventory/inspection-im-balance/index',
        nav: true,
        title: 'Saldo IM',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/quality-control/defect',
        name: 'fabric-quality-control',
        moduleId: './modules/packing-sku-inventory/fabric-quality-control/index',
        nav: true,
        title: 'Pencatatan Pemeriksaan Kain',

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
    },
    {
        route: 'packing-sku-inventory/transit-balance-summary',
        name: 'transit-balance-summary',
        moduleId: './modules/packing-sku-inventory/transit-balance-summary/index',
        nav: true,
        title: 'Saldo Transit',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/packing-area-note',
        name: 'packing-area-note',
        moduleId: './modules/packing-sku-inventory/packing-area-note/index',
        nav: true,
        title: 'Bon Packing Area Dyeing/Printing',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
       
        route: 'packing-sku-inventory/dyeing-printing-goods-warehouse',
        name: 'dyeing-printing-goods-warehouse',
        moduleId: './modules/packing-sku-inventory/dyeing-printing-goods-warehouse/index',
        nav: true,
        title: 'Bon Gudang Barang Jadi Dyeing/Printing',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
       
        route: 'packing-sku-inventory/aval-area-note',
        name: 'aval-area-note',
        moduleId: './modules/packing-sku-inventory/aval-area-note/index',
        nav: true,
        title: 'Bon Aval Area',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
       
        route: 'packing-sku-inventory/inventory-document-aval',
        name: 'inventory-document-aval',
        moduleId: './modules/packing-sku-inventory/inventory-document-aval/index',
        nav: true,
        title: 'Dokumen Inventori Aval',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
];