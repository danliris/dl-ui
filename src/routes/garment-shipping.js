module.exports = [
    {
        route: "master/garment-shipping-staff",
        name: "garment-shipping-staff",
        moduleId: "modules/master/garment-shipping-staff/index",
        nav: true,
        title: "Staff Shipping",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-fabric-type",
        name: "garment-fabric-type",
        moduleId: "modules/master/garment-fabric-type/index",
        nav: true,
        title: "Jenis Fabric",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-emkl",
        name: "garment-emkl",
        moduleId: "modules/master/garment-emkl/index",
        nav: true,
        title: "EMKL Dan Trucking Partner",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-forwarder",
        name: "garment-forwarder",
        moduleId: "modules/master/garment-forwarder/index",
        nav: true,
        title: "Forwarder",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-transaction-type",
        name: "garment-transaction-type",
        moduleId: "modules/master/garment-transaction-type/index",
        nav: true,
        title: "Jenis Transaksi Penjualan Lokal",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "master/garment-leftover-warehouse-product",
        name: "garment-leftover-warehouse-product",
        moduleId: "modules/master/garment-leftover-warehouse-product/index",
        nav: true,
        title: "Barang Gudang Sisa",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1, "SG": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
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
    },
    {
        route: "garment-shipping/invoice",
        name: "garment-shipping/invoice",
        moduleId: "modules/garment-shipping/invoice/index",
        nav: true,
        title: "Invoice Export Garment",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/cover-letter",
        name: "garment-shipping/cover-letter",
        moduleId: "modules/garment-shipping/cover-letter/index",
        nav: true,
        title: "Surat Pengantar",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/shipping-instruction",
        name: "garment-shipping/shipping-instruction",
        moduleId: "modules/garment-shipping/shipping-instruction/index",
        nav: true,
        title: "Shipping Instruction",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/export-sales-do",
        name: "garment-shipping/export-sales-do",
        moduleId: "modules/garment-shipping/export-sales-do/index",
        nav: true,
        title: "DO Penjualan Export",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/letter-of-credit",
        name: "garment-shipping/letter-of-credit",
        moduleId: "modules/garment-shipping/letter-of-credit/index",
        nav: true,
        title: "Letter Of Credit",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/amend-letter-of-credit",
        name: "garment-shipping/amend-letter-of-credit",
        moduleId: "modules/garment-shipping/amend-letter-of-credit/index",
        nav: true,
        title: "Amend Letter Of Credit",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/credit-advice",
        name: "garment-shipping/credit-advice",
        moduleId: "modules/garment-shipping/credit-advice/index",
        nav: true,
        title: "Credit Advice",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/credit-note",
        name: "garment-shipping/credit-note",
        moduleId: "modules/garment-shipping/credit-note/index",
        nav: true,
        title: "Nota Kredit",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/debit-note",
        name: "garment-shipping/debit-note",
        moduleId: "modules/garment-shipping/debit-note/index",
        nav: true,
        title: "Nota Debet",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/local-sales-note",
        name: "garment-shipping/local-sales-note",
        moduleId: "modules/garment-shipping/local-sales-note/index",
        nav: true,
        title: "Nota Penjualan (Lokal)",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/local-sales-do",
        name: "garment-shipping/local-sales-do",
        moduleId: "modules/garment-shipping/local-sales-do/index",
        nav: true,
        title: "DO Penjualan Lokal",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/local-cover-letter",
        name: "garment-shipping/local-cover-letter",
        moduleId: "modules/garment-shipping/local-cover-letter/index",
        nav: true,
        title: "Surat Pengantar (Lokal)",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/packing-list",
        name: "garment-shipping/monitoring/packing-list",
        moduleId: "modules/garment-shipping/monitoring/packing-list/index",
        nav: true,
        title: "Monitoring Packing List",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/local-price-correction-note",
        name: "garment-shipping/local-price-correction-note",
        moduleId: "modules/garment-shipping/local-price-correction-note/index",
        nav: true,
        title: "Nota Koreksi Harga",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/local-return-note",
        name: "garment-shipping/local-return-note",
        moduleId: "modules/garment-shipping/local-return-note/index",
        nav: true,
        title: "Nota Retur",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
]