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
        route: 'packing-sku-inventory/im-area-input',
        name: 'im-area-input',
        moduleId: './modules/packing-sku-inventory/im-area-input/index',
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
        route: 'packing-sku-inventory/im-area-output',
        name: 'product-packing',
        moduleId: './modules/packing-sku-inventory/im-area-output/index',
        nav: true,
        title: 'Bon Inspection Material Dyeing/Printing',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/transit-area-input',
        name: 'transit-area-input',
        moduleId: './modules/packing-sku-inventory/transit-area-input/index',
        nav: true,
        title: 'Penerimaan Transit Area Dyeing/Printing',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/transit-area-output',
        name: 'transit-area-output',
        moduleId: './modules/packing-sku-inventory/transit-area-output/index',
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
            // permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/dyeing-printing-out-packaging',
        name: 'dyeing-printing-out-packaging',
        moduleId: './modules/packing-sku-inventory/dyeing-printing-out-packaging-v2/index',
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
        route: 'packing-sku-inventory/dyeing-printing-in-warehouses',
        name: 'dyeing-printing-in-warehouses',
        moduleId: './modules/packing-sku-inventory/dyeing-printing-in-warehouses/index',
        nav: true,
        title: 'Penerimaan Gudang Barang Jadi Dyeing/Printing',
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
        route: 'packing-sku-inventory/aval-area-input',
        name: 'aval-area-input',
        moduleId: './modules/packing-sku-inventory/aval-area-input/index',
        nav: true,
        title: 'Penerimaan Gudang Aval Dyeing Printing',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/aval-area-output',
        name: 'aval-area-output',
        moduleId: './modules/packing-sku-inventory/aval-area-output/index',
        nav: true,
        title: 'Dokumen Keluar Gudang Aval Dyeing Printing',
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
    // {
    //     route: 'packing-sku-inventory/dyeing-printing-in-packaging',
    //     name: 'dyeing-printing-in-packaging',
    //     moduleId: './modules/packing-sku-inventory/dyeing-printing-in-packaging/index',
    //     nav: true,
    //     title: 'Penerimaan Packing Area Dyeing/Printing',
    //     auth: true,
    //     settings: {
    //         group: "ps-inventory",
    //         permission: { "C9": 1, "F1": 1, "F2": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     }
    // },
    {
        route: 'packing-sku-inventory/dyeing-printing-in-packaging',
        name: 'dyeing-printing-in-packaging',
        moduleId: './modules/packing-sku-inventory/dyeing-printing-in-packaging-v2/index',
        nav: true,
        title: 'Penerimaan Packing Area Dyeing/Printing',
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
            // permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/shipping-area-input',
        name: 'shipping-area-input',
        moduleId: './modules/packing-sku-inventory/shipping-area-input/index',
        nav: true,
        title: 'Penerimaan Shipping Area Dyeing Printing',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packing-sku-inventory/shipping-area-output',
        name: 'shipping-area-output',
        moduleId: './modules/packing-sku-inventory/shipping-area-output/index',
        nav: true,
        title: 'Bon Keluar Shipping Area',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
];