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
      permission: { "P1": 1, "P2": 1, "P3": 1, "P4": 1, "P5": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C5": 1, "C9": 1, "B4": 1, "B9": 1 },
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
      permission: { "C5": 1, "C9": 1, "B9": 1 },
      iconClass: 'fa fa-calendar-check-o'
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
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'unit-payment-order-not-verified-history-report',
    name: 'unit-payment-order-not-verified-history-report',
    moduleId: './modules/expedition/reports/unit-payment-order-not-verified-history-report/index',
    nav: true,
    title: 'Histori SPB Not Verified',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/purchasing-disposition-expedition',
    name: 'purchasing-disposition-expedition',
    moduleId: './modules/expedition/purchasing-disposition-expedition/index',
    nav: true,
    title: 'Penyerahan Dokumen Disposisi Pembayaran ke Verifikasi',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/purchasing-disposition-acceptance',
    name: 'purchasing-disposition-acceptance',
    moduleId: './modules/expedition/purchasing-disposition-acceptance/index',
    nav: true,
    title: 'Penerimaan Dokumen Disposisi Pembayaran',
    auth: true,
    settings: {
      group: "finance",
      permission: { "B4": 1, "B9": 1, "C9": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/verification/disposition-verification',
    name: 'disposition-verification',
    moduleId: './modules/verification/disposition-verification/index',
    nav: true,
    title: 'Verifikasi Disposisi',
    auth: true,
    settings: {
      group: "finance",
      permission: { "C5": 1, "B9": 1, "C9": 1 },
      iconClass: 'fa fa-calendar-check-o'
    }
  },
  {
    route: '/expedition/reports/purchasing-disposition-expedition',
    name: 'purchasing-disposition-expedition',
    moduleId: './modules/expedition/reports/purchasing-disposition-expedition/index',
    nav: true,
    title: 'Laporan Ekspedisi Disposisi Pembayaran',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "B4": 1, "C5": 1, "C9": 1, "B1": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/expedition/payment-disposition-note',
    name: 'payment-disposition-note',
    moduleId: './modules/expedition/payment-disposition-note/index',
    nav: true,
    title: 'Bukti Pembayaran Disposisi',
    auth: true,
    settings: {
      group: "finance",
      permission: { "B4": 1, "C5": 1, "C9": 1, "B1": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: 'payment-disposition-not-verified-report',
    name: 'payment-disposition-not-verified-report',
    moduleId: './modules/expedition/reports/payment-disposition-not-verified-report/index',
    nav: true,
    title: 'Laporan Disposisi Not Verified',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'payment-disposition-not-verified-history-report',
    name: 'payment-disposition-not-verified-history-report',
    moduleId: './modules/expedition/reports/payment-disposition-not-verified-history-report/index',
    nav: true,
    title: 'Histori Disposisi Not Verified',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
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
      permission: { "B4": 1, "C5": 1, "C9": 1 },
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
      permission: { "B4": 1, "C5": 1, "C9": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/expedition/daily-bank-transaction-document-in',
    name: 'daily-bank-transaction-document-in',
    moduleId: './modules/expedition/daily-bank-transaction-document-in/index',
    nav: true,
    title: 'Transaksi Harian Bank Masuk',
    auth: true,
    settings: {
      group: "finance",
      permission: { "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/daily-bank-transaction-document-out',
    name: 'daily-bank-transaction-document-out',
    moduleId: './modules/expedition/daily-bank-transaction-document-out/index',
    nav: true,
    title: 'Transaksi Harian Bank Keluar',
    auth: true,
    settings: {
      group: "finance",
      permission: { "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/reports/daily-bank-mutation-document',
    name: 'daily-bank-mutation-report',
    moduleId: './modules/expedition/reports/daily-bank-mutation-report/index',
    nav: true,
    title: 'Laporan Mutasi Bank',
    auth: true,
    settings: {
      group: "finance",
      permission: { "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/reports/daily-account-balance',
    name: 'daily-account-balance',
    moduleId: './modules/expedition/reports/daily-account-balance/index',
    nav: true,
    title: 'Laporan Saldo Bank Harian',
    auth: true,
    settings: {
      group: "finance",
      permission: { "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/sales-receipt',
    name: 'sales-receipt',
    moduleId: './modules/expedition/sales-receipt/index',
    nav: true,
    title: 'Kuitansi Penjualan',
    auth: true,
    settings: {
      group: "finance",
      permission: { "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/pph-bank-expenditure-note',
    name: 'pph-bank-expenditure-note',
    moduleId: './modules/expedition/pph-bank-expenditure-note/index',
    nav: true,
    title: 'Pengajuan Pembayaran PPH',
    auth: true,
    settings: {
      group: "finance",
      permission: { "B4": 1, "C5": 1, "C9": 1, "B1": 1 },
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
      permission: { "B4": 1, "C5": 1, "C9": 1, "B1": 1 },
      iconClass: 'fa fa-calendar-check-o'
    }
  },
  {
    route: '/expedition/reports/local-credit-balance',
    name: 'local-credit-balance-report',
    moduleId: './modules/expedition/reports/local-credit-balance-report/index',
    nav: true,
    title: 'Saldo Hutang Lokal',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/reports/local-foreign-currency-credit-balance',
    name: 'local-foreign-currency-credit-balance-report',
    moduleId: './modules/expedition/reports/local-foreign-currency-credit-balance-report/index',
    nav: true,
    title: 'Saldo Hutang Lokal Valas',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/reports/import-credit-balance',
    name: 'import-credit-balance-report',
    moduleId: './modules/expedition/reports/import-credit-balance-report/index',
    nav: true,
    title: 'Saldo Hutang Import',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/reports/creditor-account',
    name: 'creditor-account-report',
    moduleId: './modules/expedition/reports/creditor-account-report/index',
    nav: true,
    title: 'Kartu Hutang',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/down-payment',
    name: 'down-payment',
    moduleId: './modules/expedition/down-payment/index',
    nav: true,
    title: 'Bukti Pemasukan Bank',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'finance/memo',
    name: 'memo',
    moduleId: './modules/sales/memo/index',
    nav: true,
    title: 'Memo',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/reports/sales-invoices-report',
    name: 'sales-invoices-report',
    moduleId: './modules/expedition/reports/sales-invoices-report/index',
    nav: true,
    title: 'Laporan Pembayaran Faktur',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/expedition/reports/sales-receipt-report',
    name: 'sales-receipt-report',
    moduleId: './modules/expedition/reports/sales-receipt-report/index',
    nav: true,
    title: 'Laporan Kwitansi',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "C9": 1, "B4": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'garment-invoice-payment',
    name: 'garment-invoice-payment',
    moduleId: './modules/expedition/garment-invoice-payment/index',
    nav: true,
    title: 'Pembayaran Invoice Export Garment',
    auth: true,
    settings: {
      group: "finance",
      permission: { "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'vb-request-document-non-po',
    name: 'vb-request-document-non-po',
    moduleId: './modules/purchasing/vb-request-document-non-po/index',
    nav: true,
    title: 'Permohonan VB Non PO',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P2": 1, "P3": 1, "P4": 1, "P5": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'vb-with-po-request',
    name: 'vb-with-po-request',
    moduleId: './modules/purchasing/vb-with-po-request/index',
    nav: true,
    title: 'Permohonan VB Dengan PO',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P2": 1, "P3": 1, "P4": 1, "P5": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'cashier-approval',
    name: 'cashier-approval',
    moduleId: './modules/purchasing/cashier-approval/index',
    nav: true,
    title: 'Approval Kasir',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "PI": 7, "PG": 7, "PK": 7, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'vb-status-report',
    name: 'vb-status-report',
    moduleId: './modules/purchasing/reports/vb-status-report/index',
    nav: true,
    title: 'Laporan Status VB',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "B4": 1, "C5": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'realization-vb-non-po',
    name: 'realization-vb-non-po',
    moduleId: './modules/purchasing/realization-vb-non-po/index',
    nav: true,
    title: 'Realisasi VB non PO',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'vb-realization-with-po-document',
    name: 'vb-realization-with-po-document',
    moduleId: './modules/purchasing/vb-realization-with-po-document/index',
    nav: true,
    title: 'Realisasi VB dengan PO',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'vb-realization-to-verification',
    name: 'vb-realization-to-verification',
    moduleId: './modules/expedition/vb-realization-to-verification/index',
    nav: true,
    title: 'Penyerahan VB Realisasi Ke Verifikasi',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P2": 1, "P3": 1, "P4": 1, "P5": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'vb-realization-acceptance',
    name: 'vb-realization-acceptance',
    moduleId: './modules/expedition/vb-realization-acceptance/index',
    nav: true,
    title: 'Penerimaan VB Realisasi',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P2": 1, "P3": 1, "P4": 1, "P5": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'vb-realization-verification',
    name: 'vb-realization-verification',
    moduleId: './modules/expedition/vb-realization-verification/index',
    nav: true,
    title: 'Verifikasi Realisasi VB',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'clearance-vb',
    name: 'clearance-vb',
    moduleId: './modules/purchasing/clearance-vb/index',
    nav: true,
    title: 'Clearance VB',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "B9": 1, "B4": 1, "C5": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'vb-realization-expedition-report',
    name: 'vb-realization-expedition-report',
    moduleId: './modules/expedition/vb-realization-expedition-report/index',
    nav: true,
    title: 'Laporan Ekspedisi Realisasi VB',
    auth: true,
    settings: {
      group: "finance",
      permission: { "P1": 1, "P2": 1, "P3": 1, "P4": 1, "P5": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  }
];
