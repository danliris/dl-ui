module.exports = [
    {
        route: '/expedition/purchasing-to-verification',
        name: 'purchasing-to-verification',
        moduleId: './modules/expedition/purchasing-to-verification/index',
        nav: true,
        title: 'Ekspedisi Penyerahan ke Verifikasi',
        auth: true,
        settings: {
            group: "finance",
            permission: { "P1": 1, "P2": 1, "P3": 1, "P4": 1, "P5": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
            iconClass: 'fa fa-clone'
        }
    },
    {
        route: '/expedition/purchasing-document-acceptance',
        name: 'purchasing-document-acceptance',
        moduleId: './modules/expedition/purchasing-document-acceptance/index',
        nav: true,
        title: 'Penerimaan Dokumen Pembelian',
        auth: true,
        settings: {
            group: "finance",
            permission: { "B4": 1, "B9": 1, "C9": 1 },
            iconClass: 'fa fa-clone'
        }
    },
    {
        route: '/expedition/reports/unit-payment-order-expedition',
        name: 'unit-payment-order-expedition',
        moduleId: './modules/expedition/reports/unit-payment-order-expedition/index',
        nav: true,
        title: 'Laporan Ekspedisi Surat Perintah Bayar',
        auth: true,
        settings: {
            group: "finance",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "B4": 1, "C5":1, "C9": 1 },
            iconClass: 'fa fa-clone'
        }
    },
    {
        route: '/verification/unit-payment-order-verification',
        name: 'purchasing-document-expedition',
        moduleId: './modules/verification/unit-payment-order-verification/index',
        nav: true,
        title: 'Verifikasi Surat Perintah Bayar',
        auth: true,
        settings: {
            group: "finance",
            permission: { "C5": 1, "B9":1, "C9": 1 },
            iconClass: 'fa fa-calendar-check-o'
        }
    },
    {
        route: '/expedition/pph-bank-expenditure-note',
        name: 'pph-bank-expenditure-note',
        moduleId: './modules/expedition/pph-bank-expenditure-note/index',
        nav: true,
        title: 'Bukti Pengeluaran Bank PPH',
        auth: true,
        settings: {
            group: "finance",
            permission: { "B4": 1,"C5": 1, "C9": 1 },
            iconClass: 'fa fa-calendar-check-o'
        }
    },
    {
        route: '/expedition/reports/pph-bank-expenditure-note',
        name: 'pph-bank-expenditure-note',
        moduleId: './modules/expedition/reports/pph-bank-expenditure-note/index',
        nav: true,
        title: 'Laporan Bukti Pengeluaran Bank PPH',
        auth: true,
        settings: {
            group: "finance",
            permission: { "B4": 1,"C5": 1, "C9": 1 },
            iconClass: 'fa fa-calendar-check-o'
        }
    },
    {
        route: '/expedition/bank-expenditure-note',
        name: 'purchasing-document-expedition',
        moduleId: './modules/expedition/bank-expenditure-note/index',
        nav: true,
        title: 'Bukti Pengeluaran Bank DPP + PPN',
        auth: true,
        settings: {
            group: "finance",
            permission: { "B4": 1,"C5": 1, "C9": 1 },
            iconClass: 'fa fa-calendar-check-o'
        }
    },
    {
        route: '/expedition/reports/bank-expenditure-note-dpp-ppn',
        name: 'bank-expenditure-note',
        moduleId: './modules/expedition/reports/bank-expenditure-note-dpp-ppn/index',
        nav: true,
        title: 'Laporan Bukti Pengeluaran Bank DPP + PPN',
        auth: true,
        settings: {
            group: "finance",
            permission: { "B4": 1,"C5": 1, "C9": 1 },
            iconClass: 'fa fa-clone'
        }
    },
    {
        route: '/expedition/reports/unit-payment-order-paid-status',
        name: 'unit-payment-order-paid-status',
        moduleId: './modules/expedition/reports/unit-payment-order-paid-status/index',
        nav: true,
        title: 'Laporan Status Bayar SPB',
        auth: true,
        settings: {
            group: "finance",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "B4": 1, "C5":1, "C9": 1 },
            iconClass: 'fa fa-calendar-check-o'
        }
    },
    {
        route: '/expedition/reports/unit-payment-order-unpaid',
        name: 'unit-payment-order-unpaid',
        moduleId: './modules/expedition/reports/unit-payment-order-unpaid/index',
        nav: true,
        title: 'Laporan SPB Belum Lunas',
        auth: true,
        settings: {
            group: "purchasing",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "B4": 1, "C5":1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-order-not-verified-report',
        name: 'unit-payment-order-not-verified-report',
        moduleId: './modules/expedition/reports/unit-payment-order-not-verified-report/index',
        nav: true,
        title: 'Laporan SPB Not Verified',
        auth: true,
        settings: {
            group: "finance",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'daily-bank-transaction-document',
        name: 'daily-bank-transaction-document',
        moduleId: './modules/expedition/daily-bank-transaction-document/index',
        nav: true,
        title: 'Transaksi Harian Bank',
        auth: true,
        settings: {
            group: "finance",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1},
            iconClass: 'fa fa-dashboard'
        }
      }
];
