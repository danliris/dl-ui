module.exports = [
    {
        route: 'pr',
        name: 'purchase-request',
        moduleId: './modules/purchasing/purchase-request/index',
        nav: true,
        title: 'Purchase Request',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'pr/monitoring',
        name: 'purchase-request-monitoring',
        moduleId: './modules/purchasing/monitoring-purchase-request/index',
        nav: true,
        title: 'Monitoring Purchase Request',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'monitoring-purchase-request-all-unit',
        name: 'monitoring-purchase-request-all-unit',
        moduleId: './modules/purchasing/monitoring-purchase-request-all-unit/index',
        nav: true,
        title: 'Monitoring Purchase Request Semua Unit',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po',
        name: 'purchase-order',
        moduleId: './modules/purchasing/purchase-order/index',
        nav: true,
        title: 'Purchase Order',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po-external',
        name: 'purchase-order-external',
        moduleId: './modules/purchasing/purchase-order-external/index',
        nav: true,
        title: 'Purchase Order External',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/monitoring/all',
        name: 'purchase-order-monitoring',
        moduleId: './modules/purchasing/monitoring-purchase-order-all-user/index',
        nav: true,
        title: 'Monitoring Purchase All',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "PG": 7 , "C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/monitoring',
        name: 'purchase-order-monitoring',
        moduleId: './modules/purchasing/monitoring-purchase-order/index',
        nav: true,
        title: 'Monitoring Purchase',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/periode/unit',
        name: 'purchase-order-reports-periode-unit',
        moduleId: './modules/purchasing/reports/purchase-order-report/unit-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Unit',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/periode/category',
        name: 'purchase-order-reports-periode-category',
        moduleId: './modules/purchasing/reports/purchase-order-report/category-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Kategori',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/periode/unit-category',
        name: 'purchase-order-reports-periode-unit-category',
        moduleId: './modules/purchasing/reports/purchase-order-report/unit-category-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Unit per Kategori',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'do',
        name: 'delivery-order',
        moduleId: './modules/purchasing/delivery-order/index',
        nav: true,
        title: 'Surat Jalan',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'do/monitoring',
        name: 'delivery-order-monitoring',
        moduleId: './modules/purchasing/monitoring-delivery-order/index',
        nav: true,
        title: 'Monitoring Surat Jalan',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'receipt-note/unit',
        name: 'receipt-note-unit',
        moduleId: './modules/purchasing/unit-receipt-note/index',
        nav: true,
        title: 'Bon Terima Unit',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'receipt-note/unit/monitoring',
        name: 'receipt-note-unit-monitoring',
        moduleId: './modules/purchasing/unit-receipt-note-monitoring/index',
        nav: true,
        title: 'Monitoring Bon Terima Unit',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-order',
        name: 'unit-payment-order',
        moduleId: './modules/purchasing/unit-payment-order/index',
        nav: true,
        title: 'Surat Perintah Bayar',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-note/price-correction',
        name: 'unit-payment-price-correction-note',
        moduleId: './modules/purchasing/unit-payment-price-correction-note/index',
        nav: true,
        title: 'Koreksi Harga Pembelian',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-note/quantity-correction',
        name: 'unit-payment-quantity-correction-note',
        moduleId: './modules/purchasing/unit-payment-quantity-correction-note/index',
        nav: true,
        title: 'Koreksi Jumlah Pembelian',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'generating-data',
        name: 'generating-data',
        moduleId: './modules/purchasing/generating-data/index',
        nav: true,
        title: 'Generating Data',
        auth: true,
        settings: {
            group: "purchasing",
            permission: {"C9" : 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-request-purchase-order-duration-report',
        name: 'purchase-request-purchase-order-duration-report',
        moduleId: './modules/purchasing/reports/duration-reports/purchase-request-purchase-order-duration-report/index',
        nav: true,
        title: 'Laporan Durasi PR - PO Internal',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-request-purchase-order-external-duration-report',
        name: 'purchase-request-purchase-order-external-duration-report',
        moduleId: './modules/purchasing/reports/duration-reports/purchase-request-purchase-order-external-duration-report/index',
        nav: true,
        title: 'Laporan Durasi PR - PO Eksternal',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-order-purchase-order-external-duration-report',
        name: 'purchase-order-purchase-order-external-duration-report',
        moduleId: './modules/purchasing/reports/duration-reports/purchase-order-purchase-order-external-duration-report/index',
        nav: true,
        title: 'Laporan Durasi PO Internal - PO Eksternal',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-order-external-delivery-order-duration-report',
        name: 'purchase-order-external-delivery-order-duration-report',
        moduleId: './modules/purchasing/reports/duration-reports/purchase-order-external-delivery-order-duration-report/index',
        nav: true,
        title: 'Laporan Durasi PO Eksternal - Surat Jalan',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "*": 0 },
            iconClass: 'fa fa-dashboard'
        }
    }]
