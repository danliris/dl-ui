module.exports = [
    {
        route: 'packaging-sku-inventory/inventory-document-packaging',
        name: 'inventory-document-packaging',
        moduleId: './modules/packaging-sku-inventory/inventory-document-packaging/index',
        nav: true,
        title: 'Inventory Document Packaging',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packaging-sku-inventory/inventory-movement-packaging',
        name: 'inventory-movement-packaging',
        moduleId: './modules/packaging-sku-inventory/inventory-movement-packaging/index',
        nav: true,
        title: 'Inventory Movement Packaging',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packaging-sku-inventory/inventory-summary-packaging',
        name: 'inventory-summary-packaging',
        moduleId: './modules/packaging-sku-inventory/inventory-summary-packaging/index',
        nav: true,
        title: 'Inventory Summary Packaging',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packaging-sku-inventory/inventory-document-sku',
        name: 'inventory-document-sku',
        moduleId: './modules/packaging-sku-inventory/inventory-document-sku/index',
        nav: true,
        title: 'Inventory Document SKU',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packaging-sku-inventory/inventory-movement-sku',
        name: 'inventory-movement-sku',
        moduleId: './modules/packaging-sku-inventory/inventory-movement-sku/index',
        nav: true,
        title: 'Inventory Movement SKU',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'packaging-sku-inventory/inventory-summary-sku',
        name: 'inventory-summary-sku',
        moduleId: './modules/packaging-sku-inventory/inventory-summary-sku/index',
        nav: true,
        title: 'Inventory Summary SKU',
        auth: true,
        settings: {
            group: "ps-inventory",
            permission: { "C9": 1, "F1": 1, "F2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
];