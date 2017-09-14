module.exports = [
    {
        route: '/garment/etl/garment-purchase-requests',
        name: 'etl-garment-purchase-requests',
        moduleId: './modules/garment-purchasing/etl/garment-purchase-requests/index',
        nav: true,
        title: 'ETL Garment Purchase Request',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/pr',
        name: 'purchase-request',
        moduleId: './modules/garment-purchasing/purchase-request/index',
        nav: true,
        title: 'Purchase Request',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/pr/monitoring',
        name: 'purchase-request-monitoring',
        moduleId: './modules/garment-purchasing/monitoring-purchase-request/index',
        nav: true,
        title: 'Monitoring Purchase Request',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/pr/monitoring-purchase-request/all-unit',
        name: 'purchase-request-monitoring-all-unit',
        moduleId: './modules/garment-purchasing/monitoring-purchase-request-all-unit/index',
        nav: true,
        title: 'Monitoring Purchase Request Semua Unit',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }, {
        route: '/garment/po',
        name: 'purchase-order',
        moduleId: './modules/garment-purchasing/purchase-order/index',
        nav: true,
        title: 'Purchase Order',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/po-external',
        name: 'purchase-order-external',
        moduleId: './modules/garment-purchasing/purchase-order-external/index',
        nav: true,
        title: 'Purchase Order External',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            conClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/delivery-order',
        name: 'delivery-order',
        moduleId: './modules/garment-purchasing/delivery-order/index',
        nav: true,
        title: 'Surat Jalan',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-delivery-order',
        name: 'monitoring-delivery-order',
        moduleId: './modules/garment-purchasing/monitoring-delivery-order/index',
        nav: true,
        title: 'Monitoring Surat Jalan',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/customs',
        name: 'customs',
        moduleId: './modules/garment-purchasing/customs/index',
        nav: true,
        title: 'Bea Cukai',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-customs',
        name: 'monitoring-customs',
        moduleId: './modules/garment-purchasing/monitoring-customs/index',
        nav: true,
        title: 'Monitoring Bea Cukai',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/invoice-note',
        name: 'invoice-note',
        moduleId: './modules/garment-purchasing/invoice-note/index',
        nav: true,
        title: 'Nota Invoice',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-invoice-note',
        name: 'monitoring-invoice-note',
        moduleId: './modules/garment-purchasing/monitoring-invoice-note/index',
        nav: true,
        title: 'Monitoring Nota Invoice',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/intern-note',
        name: 'intern-note',
        moduleId: './modules/garment-purchasing/intern-note/index',
        nav: true,
        title: 'Nota Intern', auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/purchase-quantity-correction',
        name: 'purchase-quantity-correction',
        moduleId: './modules/garment-purchasing/purchase-quantity-correction/index',
        nav: true,
        title: 'Koreksi Jumlah Pembelian',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/purchase-price-correction',
        name: 'purchase-price-correction',
        moduleId: './modules/garment-purchasing/purchase-price-correction/index',
        nav: true,
        title: 'Koreksi Harga Pembelian',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/unit-receipt-note',
        name: 'unit-receipt-note',
        moduleId: './modules/garment-purchasing/unit-receipt-note/index',
        nav: true,
        title: 'Bon Terima Unit',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-unit-receipt-note',
        name: 'unit-receipt-note',
        moduleId: './modules/garment-purchasing/monitoring-unit-receipt-note/index',
        nav: true,
        title: 'Monitoring Bon Terima Unit',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/monitoring-purchase-order-internal',
        name: 'monitoring-purchase-order-internal',
        moduleId: './modules/garment-purchasing/monitoring-purchase-order-internal/index',
        nav: true,
        title: 'Laporan Purchase Order Internal',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment/garment-currency',
        name: 'garment-currency',
        moduleId: './modules/garment-purchasing/garment-currency/index',
        nav: true,
        title: 'Kurs Mata Uang',
        auth: true,
        settings: {
            group: "g-purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
]
