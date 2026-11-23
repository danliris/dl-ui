module.exports = [
      {
    route: "/purchasing/signature-masters",
    name: "signature-masters",
    moduleId:
      "./modules/purchasing/signature-master/index",
    nav: true,
    title: "Signature Master",
    auth: true,
    settings: {
        group: "purchasing",
        subGroup: "master",
        permission: { "E72": 1 },
        iconClass: "fa fa-dashboard",
        },
    },
    {
        route: 'pr',
        name: 'purchase-request',
        moduleId: './modules/purchasing/purchase-request/index',
        nav: true,
        title: 'Purchase Request',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1, "B7": 1 },
            permission: { "E1": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'pr/all-user',
        name: 'purchase-request-all-user',
        moduleId: './modules/purchasing/purchase-request-all/index',
        nav: true,
        title: 'Purchase Request (Semua User)',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1, "B7": 1 },
            permission: { "E47": 1},
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
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1, "B7": 1 },
            permission: { "E12": 1},
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
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C5": 1, "C9": 1, "B1": 1, "B4": 1 },
            permission: { "E13": 1},
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
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C5": 1, "C9": 1 },
            permission: { "E2": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-order-internal/monitoring',
        name: 'po-internal-belum-unit-payment-order-monitoring',
        moduleId: './modules/purchasing/monitoring-po-internal-belum-po-external/index',
        nav: true,
        title: 'Monitoring Purchase Order Internal Belum Diproses Pembelian',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C5": 1, "C9": 1 },
            permission: { "E14": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po-internal/monitoring',
        name: 'purchase-order-internal-monitoring',
        moduleId: './modules/purchasing/monitoring-purchase-order-internal/index',
        nav: true,
        title: 'Monitoring Purchase Order Internal',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E15": 1},
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'receipt-spb-monitoring',
        name: 'receipt-spb-monitoring',
        moduleId: './modules/purchasing/unit-before-spb-monitoring/index',
        nav: true,
        title: 'Monitoring Bon Belum Buat SPB',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1 },
            permission: { "E16": 1},
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
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E3": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    // {
    //     route: 'vb-expedition-realitation-report',
    //     name: 'vb-expedition-realitation-report',
    //     moduleId: './modules/purchasing/reports/vb-expedition-realitation-report/index',
    //     nav: true,
    //     title: 'Laporan Ekspedisi Realisasi VB',
    //     auth: true,
    //     settings: {
    //         group: "purchasing",
    //         permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "B4": 1, "C5": 1, "C9": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     }
    // },
    {
        route: 'po-external/all',
        name: 'purchase-order-external-kasei',
        moduleId: './modules/purchasing/purchase-order-external-kasei/index',
        nav: true,
        title: 'Purchase Order External All',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "PI": 7, "PG": 7, "PK": 7, "C9": 1 },
            permission: { "E4": 1},
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'po-external/all-user',
        name: 'purchase-order-external-all-user',
        moduleId: './modules/purchasing/purchase-order-external-all-user/index',
        nav: true,
        title: 'Purchase Order External (Semua User)',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "PI": 7, "PG": 7, "PK": 7, "C9": 1 },
            permission: { "E71": 1},
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
            subGroup: "monitoring",
            // permission: { "P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "PI": 7, "PG": 7, "PK": 7, "C9": 1, "B1": 1, "B4": 1, "C5": 1 },
            permission: { "E17": 1},
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
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E18": 1},
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
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1, "C5": 1 },
            permission: { "E26": 1},
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
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1, "C5": 1 },
            permission: { "E27": 1},
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
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1, "C5": 1 },
            permission: { "E28": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/periode/supplier',
        name: 'purchase-order-reports-periode-supplier',
        moduleId: './modules/purchasing/reports/purchase-order-report/supplier-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Supplier',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1, "C5": 1 },
            permission: { "E29": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'delivery-order',
        name: 'delivery-order',
        moduleId: './modules/purchasing/delivery-order/index',
        nav: true,
        title: 'Surat Jalan',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E5": 1},
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
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E19": 1},
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
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1, "B7": 1 },
            permission: { "E6": 1},
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
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1, "B7": 1 },
            permission: { "E20": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'report/bon-unit-blm-spb',
        name: 'bon-unit-blm-spb',
        moduleId: './modules/purchasing/reports/bon-unit-blm-spb/index',
        nav: true,
        title: 'Laporan Bon Terima Unit Belum Dibuat SPB',
        auth: true,
        settings: {
            group: "purchasing",
            //permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
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
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E7": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-order/all',
        name: 'unit-payment-order-all',
        moduleId: './modules/purchasing/unit-payment-order-all/index',
        nav: true,
        title: 'Surat Perintah Bayar All',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "PI": 7, "PG": 7, "PK": 7, "C9": 1 },
            permission: { "E8": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/monitoring/spb',
        name: 'surat-perintah-bayar-monitoring',
        moduleId: './modules/purchasing/monitoring-surat-perintah-bayar-new/index',
        nav: true,
        title: 'Monitoring Surat Perintah Bayar',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1 },
            permission: { "E21": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/monitoring/tax',
        name: 'incometax-vat-monitoring',
        moduleId: './modules/purchasing/monitoring-ppn-pph/index',
        nav: true,
        title: 'Monitoring PPN & PPH',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1 },
            permission: { "E22": 1},
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
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-note/price-correction/monitoring',
        name: 'unit-payment-price-correction-note-monitoring',
        moduleId: './modules/purchasing/koreksi-harga/index',
        nav: true,
        title: 'Monitoring Koreksi Harga',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1 },
            permission: { "E23": 1},
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
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E10": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'correction-quantity',
        name: 'unit-payment-quantity-koreksi',
        moduleId: './modules/purchasing/koreksi-jumlah/index',
        nav: true,
        title: 'Monitoring Koreksi Jumlah',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B1": 1 },
            permission: { "E24": 1},
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
            // permission: { "C9": 1, "B1": 1 },
            permission: { "E39": 1},
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
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E30": 1},
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
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E31": 1},
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
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E32": 1},
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
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E33": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-order/monitoring-price',
        name: 'purchase-order-monitoring-price',
        moduleId: './modules/purchasing/monitoring-price/index',
        nav: true,
        title: 'Monitoring Price',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "W1": 1, "W2": 1, "B1": 1, "C5": 1 },
            permission: { "E25": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-order/monitoring-product-price',
        name: 'purchase-order-monitoring-product-price',
        moduleId: './modules/purchasing/monitoring-product-price/index',
        nav: true,
        title: 'Monitoring Perubahan Harga Barang',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            
            permission: { "E40": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
     {
        route: 'purchase-order/verification-md365invoice-externalinvoice',
        name: 'verification-md365invoice-externalinvoice',
        moduleId: './modules/purchasing/verification-md365invoice-externalinvoice/index',
        nav: true,
        title: 'Verifikasi MD365 Invoice - External Invoice',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            
            permission: { "E41": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-order/verification-spb-externaldocument',
        name: 'verification-spb-externaldocument',
        moduleId: './modules/purchasing/verification-spb-externaldocument/index',
        nav: true,
        title: 'Verifikasi SPB - Dokumen Eksternal',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            
            permission: { "E42": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/ketepatan/staff',
        name: 'purchase-order-reports-ketepatan-staff',
        moduleId: './modules/purchasing/reports/purchase-order-report/staff-report-new/index',
        nav: true,
        title: 'Laporan Ketepatan kedatangan Barang per Staff',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E34": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'report/local-purchasing-book-report',
        name: 'local-purchasing-book-report',
        moduleId: './modules/purchasing/reports/local-purchasing-book-report/index',
        nav: true,
        title: 'Laporan Buku Pembelian Lokal',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1 },
            permission: { "E35": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'report/local-valas-purchasing-book-report',
        name: 'local-valas-purchasing-book-report',
        moduleId: './modules/purchasing/reports/local-valas-purchasing-book-report/index',
        nav: true,
        title: 'Laporan Buku Pembelian Lokal Valas',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1 },
            permission: { "E36": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'report/import-purchasing-book',
        name: 'import-purchasing-book-report',
        moduleId: './modules/purchasing/reports/import-purchasing-book/index',
        nav: true,
        title: 'Laporan Buku Pembelian Import',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1 },
            permission: { "E37": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-order-not-verified-report',
        name: 'unit-payment-order-not-verified-report',
        moduleId: './modules/purchasing/reports/unit-payment-order-not-verified-report/index',
        nav: true,
        title: 'Laporan SPB Not Verified',
        auth: true,
        settings: {
            group: "purchasing",
            //permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchasing-disposition',
        name: 'purchasing-disposition',
        moduleId: './modules/purchasing/purchasing-disposition/index',
        nav: true,
        title: 'Disposisi Pembayaran',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E11": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/expedition/reports/unit-payment-order-paid-status-report',
        name: 'unit-payment-order-paid-status',
        moduleId: './modules/expedition/reports/unit-payment-order-paid-status-report/index',
        nav: true,
        title: 'Laporan Status Bayar SPB',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "B4": 1, "C5": 1, "C9": 1 },
            permission: { "E38": 1},
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'purchasing-unit-expenditure-note',
        name: 'purchasing-unit-expenditure-note',
        moduleId: './modules/purchasing/unit-expenditure-note-by-user/index',
        nav: true,
        title: 'Bon Pengeluaran Unit Umum',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E43": 1},
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'purchasing-unit-expenditure-note-all',
        name: 'purchasing-unit-expenditure-note-all',
        moduleId: './modules/purchasing/unit-expenditure-note-all/index',
        nav: true,
        title: 'Bon Pengeluaran Unit Umum (Semua User)',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E44": 1},
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'expenditure-note/unit/monitoring',
        name: 'expenditure-note-unit-monitoring',
        moduleId: './modules/purchasing/unit-expenditure-note-monitoring/index',
        nav: true,
        title: 'Monitoring Bon Pengeluaran Unit',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "monitoring",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "C9": 1, "A1": 1, "B9": 1, "A4": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1, "B7": 1 },
            permission: { "E45": 1},
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: 'report/stock-report',
        name: 'report-stock-report',
        moduleId: './modules/purchasing/reports/stock-report/index',
        nav: true,
        title: 'Laporan Stock Gudang Umum',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "laporan",
            permission: { "E46": 1 },
            iconClass: 'fa fa-dashboard'
        }
},

    {
        //pinjam permission
        route: 'purchasing-general-disposition',
        name: 'purchasing-general-disposition',
        moduleId: './modules/purchasing/purchasing-general-disposition/index',
        nav: true,
        title: 'Disposisi Umum',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E48": 1},
            iconClass: 'fa fa-dashboard'
        }
    },

     {
        //pinjam permission
        route: 'purchasing-general-disposition-all',
        name: 'purchasing-general-disposition-all',
        moduleId: './modules/purchasing/purchasing-general-disposition-all/index',
        nav: true,
        title: 'Disposisi Umum (Semua User)',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E49": 1},
            iconClass: 'fa fa-dashboard'
        }
    },

     {
        //pinjam permission
        route: 'purchasing-disposition-unit',
        name: 'purchasing-disposition-unit',
        moduleId: './modules/purchasing/purchasing-disposition-unit/index',
        nav: true,
        title: 'Disposisi Permintaan Unit',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E50": 1},
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        //pinjam permission
        route: 'purchasing-disposition-unit-all',
        name: 'purchasing-disposition-unit-all',
        moduleId: './modules/purchasing/purchasing-disposition-unit-all/index',
        nav: true,
        title: 'Disposisi Permintaan Unit (Semua User)',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E51": 1},
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        //pinjam permission
        route: 'purchasing-disposition-purchase',
        name: 'purchasing-disposition-purchase',
        moduleId: './modules/purchasing/purchasing-disposition-purchase/index',
        nav: true,
        title: 'Disposisi Pembelian',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E52": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        //pinjam permission
        route: 'purchasing-disposition-purchase-all',
        name: 'purchasing-disposition-purchase-all',
        moduleId: './modules/purchasing/purchasing-disposition-purchase-all/index',
        nav: true,
        title: 'Disposisi Pembelian (Semua User)',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "transaksi",
            // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            permission: { "E53": 1},
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        //pinjam permission
        route: '/purchasing/disposition-unit-approval/unit1',
        name: 'disposition-unit-approval-unit1',
        moduleId: './modules/purchasing/disposition-unit-approval/index',
        nav: true,
        title: 'Disposition Permintaan Unit Approval - Unit 1',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E54": 1 },
            iconClass: 'fa fa-calculator',
            type: "unit1"
        }
    },

     {
        //pinjam permission
        route: '/purchasing/disposition-unit-approval/unit2',
        name: 'disposition-unit-approval-unit2',
        moduleId: './modules/purchasing/disposition-unit-approval/index',
        nav: true,
        title: 'Disposition Permintaan Unit Approval - Unit 2',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E55": 1 },
            iconClass: 'fa fa-calculator',
            type: "unit2"
        }
    },

      {
        //pinjam permission
        route: '/purchasing/disposition-unit-approval/gm',
        name: 'disposition-unit-approval-gm',
        moduleId: './modules/purchasing/disposition-unit-approval/index',
        nav: true,
        title: 'Disposition Permintaan Unit Approval - GM Purchasing',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E56": 1 },
            iconClass: 'fa fa-calculator',
            type: "gm"
        }
    },
    {
        //pinjam permission
        route: '/purchasing/disposition-general-purchasing-approval/manager',
        name: 'disposition-general-purchasing-approval-manager',
        moduleId: './modules/purchasing/disposition-general-purchasing-approval/index',
        nav: true,
        title: 'Disposition Umum Approval - Manager Purchasing',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E57": 1 },
            iconClass: 'fa fa-calculator',
            type: "manager"
        }
    },
    {
        //pinjam permission
        route: '/purchasing/disposition-general-purchasing-approval/gm',
        name: 'disposition-general-purchasing-approval-gm',
        moduleId: './modules/purchasing/disposition-general-purchasing-approval/index',
        nav: true,
        title: 'Disposition Umum Approval - GM Purchasing',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E58": 1 },
            iconClass: 'fa fa-calculator',
            type: "gm"
        }
    },
    {
        //pinjam permission
        route: '/purchasing/disposition-general-purchasing-approval/directur',
        name: 'disposition-general-purchasing-approval-directur',
        moduleId: './modules/purchasing/purchasing-general-disposition-approval-directur/index',
        nav: true,
        title: 'Disposition Umum Approval - Direktur Keuangan',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E59": 1 },
            iconClass: 'fa fa-calculator',
        }
    },

    {
        //pinjam permission
        route: '/purchasing/disposition-general-purchasing-approval/anggaran',
        name: 'disposition-general-purchasing-approval-anggaran',
        moduleId: './modules/purchasing/disposition-general-purchasing-approval/index',
        nav: true,
        title: 'Disposition Umum Approval - Anggaran',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E60": 1 },
            iconClass: 'fa fa-calculator',
            type: "anggaran"
        }
    },
    {
        //pinjam permission
        route: '/purchasing/purchase-request-approval/unit1',
        name: 'purchase-request-approval-unit1',
        moduleId: './modules/purchasing/purchase-request-approval/index',
        nav: true,
        title: 'Purchase Request Approval - Unit 1',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E61": 1 },
            iconClass: 'fa fa-calculator',
            type: "unit1"
        }
    },
    {
        //pinjam permission
        route: '/purchasing/purchase-request-approval/unit2',
        name: 'purchase-request-approval-unit2',
        moduleId: './modules/purchasing/purchase-request-approval/index',
        nav: true,
        title: 'Purchase Request Approval - Unit 2',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E62": 1 },
            iconClass: 'fa fa-calculator',
            type: "unit2"
        }
    },
    {
        //pinjam permission
        route: '/purchasing/purchase-request-approval/purchasing',
        name: 'purchase-request-approval-purchasing',
        moduleId: './modules/purchasing/purchase-request-approval/index',
        nav: true,
        title: 'Purchase Request Approval Price - Purchasing',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E63": 1 },
            iconClass: 'fa fa-calculator',
            type: "purchasing"
        }
    },
    {
        //pinjam permission
        route: '/purchasing/purchase-request-approval/manager',
        name: 'purchase-request-approval-manager',
        moduleId: './modules/purchasing/purchase-request-approval/index',
        nav: true,
        title: 'Purchase Request Approval - Manager Purchasing',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E64": 1 },
            iconClass: 'fa fa-calculator',
            type: "manager"
        }
    },
    {
        //pinjam permission
        route: '/purchasing/purchase-request-approval/gm',
        name: 'purchase-request-approval-gm',
        moduleId: './modules/purchasing/purchase-request-approval/index',
        nav: true,
        title: 'Purchase Request Approval - GM Purchasing',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E65": 1 },
            iconClass: 'fa fa-calculator',
            type: "gm"
        }
    },
    {
        //pinjam permission
        route: '/purchasing/purchase-request-approval/anggaran',
        name: 'purchase-request-approval-anggaran',
        moduleId: './modules/purchasing/purchase-request-approval/index',
        nav: true,
        title: 'Purchase Request Approval - Anggaran',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E66": 1 },
            iconClass: 'fa fa-calculator',
            type: "anggaran"
        }
    },
    {
        //pinjam permission
        route: '/purchasing/disposition-purchasing-approval/level1',
        name: 'disposition-purchasing-approval-level1',
        moduleId: './modules/purchasing/disposition-purchasing-approval/index',
        nav: true,
        title: 'Disposition Pembelian Approval - Level 1',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E67": 1 },
            iconClass: 'fa fa-calculator',
            type: "level1"
        }
    },
    {
        //pinjam permission
        route: '/purchasing/purchasing-disposition-purchase-approval-directur',
        name: 'disposition-purchasing-approval-directur',
        moduleId: './modules/purchasing/purchasing-disposition-purchase-approval-directur/index',
        nav: true,
        title: 'Disposition Pembelian Approval - Directur Keuangan',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E69": 1 },
            iconClass: 'fa fa-calculator',
        }
    },
     {
        route: '/purchasing/purchase-order-external-approval/level1',
        name: 'purchase-order-external-approval-level1',
        moduleId: './modules/purchasing/purchase-order-external-approval/index',
        nav: true,
        title: 'Purchase Order External Approval - GM Purchasing',
        auth: true,
        settings: {
            group: "purchasing",
            subGroup: "approval",
            // permission: { "PGA": 1, "C7": 1, "C9": 1 },
            permission: { "E70": 1 },
            iconClass: 'fa fa-calculator',
            type: "level1"
        }
    },

]
