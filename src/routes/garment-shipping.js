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
        route: '/merchandiser/garment-sales-contract',
        name: 'garment-sales-contract',
        moduleId: './modules/merchandiser/garment-sales-contract/index',
        nav: true,
        title: 'Sales Contract Per RO (Semua User)',
        auth: true,
        settings: {
            group: "merchandiser",
            permission: { "C9": 1 },
            iconClass: 'fa fa-calculator',
            byUser: false
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
        route: "garment-shipping/monitoring/invoice",
        name: "garment-shipping/monitoring/invoice",
        moduleId: "modules/garment-shipping/monitoring/garment-invoice/index",
        nav: true,
        title: "Monitoring Invoice Export Garment",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-by-unit",
        name: "garment-shipping/monitoring/omzet-by-unit",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthy-by-unit/index",
        nav: true,
        title: "Monitoring Omzet Garment Per Unit",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-by-buyer",
        name: "garment-shipping/monitoring/omzet-by-buyer",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthly-by-buyer/index",
        nav: true,
        title: "Monitoring Omzet Garment Per Buyer",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-by-setion",
        name: "garment-shipping/monitoring/omzet-by-section",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthly-by-section/index",
        nav: true,
        title: "Monitoring Omzet Garment Per Seksi",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-by-country",
        name: "garment-shipping/monitoring/omzet-by-country",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthly-by-country/index",
        nav: true,
        title: "Monitoring Omzet Garment Per Negara",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-by-comodity",
        name: "garment-shipping/monitoring/omzet-by-comodity",
        moduleId: "modules/garment-shipping/monitoring/garment-omzet-monthly-by-comodity/index",
        nav: true,
        title: "Monitoring Omzet Garment Per Komoditi",
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
        route: "garment-shipping/monitoring/debit-note",
        name: "garment-shipping/monitoring/debit-note",
        moduleId: "modules/garment-shipping/monitoring/garment-debit-note/index",
        nav: true,
        title: "Monitoring Nota Debit",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/credit-note",
        name: "garment-shipping/monitoring/credit-note",
        moduleId: "modules/garment-shipping/monitoring/garment-credit-note/index",
        nav: true,
        title: "Monitoring Nota Kredit",
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
    {
        route: "garment-shipping/local-price-cutting-note",
        name: "garment-shipping/local-price-cutting-note",
        moduleId: "modules/garment-shipping/local-price-cutting-note/index",
        nav: true,
        title: "Nota Potongan",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/recap-omzet-per-month",
        name: "garment-shipping/monitoring/recap-omzet-per-month",
        moduleId: "modules/garment-shipping/monitoring/recap-omzet-per-month/index",
        nav: true,
        title: "Monitoring Rekap Omzet / Bulan",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },    
    {
        route: "garment-shipping/monitoring/omzet-year-buyer",
        name: "garment-shipping/monitoring/omzet-year-buyer",
        moduleId: "modules/garment-shipping/monitoring/omzet-year-buyer/index",
        nav: true,
        title: "Report Omzet Per Tahun Per Buyer",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
    {
        route: "garment-shipping/monitoring/omzet-year-unit",
        name: "garment-shipping/monitoring/omzet-year-unit",
        moduleId: "modules/garment-shipping/monitoring/omzet-year-unit/index",
        nav: true,
        title: "Report Omzet Per Tahun Per Unit",
        auth: true,
        settings: {
            group: "g-shipping",
            permission: { "C9": 1 },
            iconClass: "fa fa-dashboard"
        }
    },
]