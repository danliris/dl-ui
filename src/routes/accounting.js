module.exports = [
  {
    route: '/accounting/journal-transaction',
    name: 'journal-transaction',
    moduleId: './modules/accounting/journal-transaction/index',
    nav: true,
    title: 'Jurnal Transaksi',
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N31": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/accounting/post-transaction',
    name: 'journal-transaction',
    moduleId: './modules/accounting/posting-transactions/index',
    nav: true,
    title: 'Posting Jurnal Transaksi',
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N32": 1 },
      iconClass: 'fa fa-clone'
    }
  },
   {
    route: "garment-finance/report/local-purchasing-journal",
    name: "local-purchasing-journal",
    moduleId: "./modules/garment-finance/bank-cash/report/local-purchasing-journal/index",
    nav: true,
    title: "Jurnal Pembelian Lokal",
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      //permission: { "B1": 1, "C9": 1 },
      permission: { "N44": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/report/import-purchasing-journal",
    name: "import-purchasing-journal",
    moduleId: "./modules/garment-finance/bank-cash/report/import-purchasing-journal/index",
    nav: true,
    title: "Jurnal Pembelian Import",
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N45": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/report/export-sales-journal",
    name: "export-sales-journal",
    moduleId: "./modules/garment-finance/bank-cash/report/export-sales-journal/index",
    nav: true,
    title: "Jurnal Penjualan Export",
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N46": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
    {
    route: "garment-finance/report/local-sales-journal",
    name: "local-sales-journal",
    moduleId: "./modules/garment-finance/bank-cash/report/local-sales-journal/index",
    nav: true,
    title: "Jurnal Penjualan Lokal",
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N47": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: '/accounting/post-vb-transaction',
    name: 'journal-transaction-vb',
    moduleId: './modules/accounting/posting-vb-transactions/index',
    nav: true,
    title: 'Pengisian Debit Jurnal VB',
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N33": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/accounting/reports/journal-transaction-report',
    name: 'journal-transaction-report',
    moduleId: './modules/accounting/reports/journal-transaction-report/index',
    nav: true,
    title: 'Laporan Jurnal Transaksi',
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N34": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/accounting/chart-of-accounts-view',
    name: 'chart-of-accounts',
    moduleId: './modules/accounting/chart-of-accounts-view/index',
    nav: true,
    title: 'Chart of Account All User',
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "P1": 1, "P2": 1, "P3": 1, "P4": 1, "P5": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
      permission: { "N35": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/accounting/chart-of-accounts',
    name: 'chart-of-accounts',
    moduleId: './modules/accounting/chart-of-accounts/index',
    nav: true,
    title: 'Chart of Account',
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N36": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/accounting/revise-empty-chart-of-accounts',
    name: 'revise-empty-chart-of-accounts',
    moduleId: './modules/accounting/revise-empty-chart-of-accounts/index',
    nav: true,
    title: 'Pengisian Nama Chart of Account',
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N37": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/accounting/locking-transactions',
    name: 'locking-transactions',
    moduleId: './modules/accounting/locking-transactions/index',
    nav: true,
    title: 'Penguncian Transaksi',
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N38": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/accounting/reports/sub-ledgers-report',
    name: 'sub-ledgers',
    moduleId: './modules/accounting/reports/sub-ledgers-report/index',
    nav: true,
    title: 'Laporan Sub Ledger',
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N39": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/accounting/reports/general-ledgers-report',
    name: 'general-ledgers',
    moduleId: './modules/accounting/reports/general-ledgers-report/index',
    nav: true,
    title: 'Laporan General Ledger',
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N40": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: 'accounting/others-expenditure-proof-document',
    name: 'others-expenditure-proof-document',
    moduleId: './modules/accounting/others-expenditure-proof-document/index',
    nav: true,
    title: 'Bukti Pengeluaran Bank Lain - Lain',
    auth: true,
    settings: {
      group: "finance",
      // permission: { "B1": 1, "C9": 1 },
      permission: {"K58":1},
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: 'accounting/reports/other-expenditure-proof-report',
    name: 'other-expenditure-proof-report',
    moduleId: './modules/accounting/reports/other-expenditure-proof-report/index',
    nav: true,
    title: 'Laporan Bukti Pengeluaran Bank Lain - Lain',
    auth: true,
    settings: {
      group: "finance",
      // permission: { "B1": 1, "C9": 1 },
      permission: {"K59":1},
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: 'balance-debt',
    name: 'balance-debt',
    moduleId: './modules/accounting/balance-debt/index',
    nav: true,
    title: 'Saldo Hutang Garment',
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N41": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'garment-flow-detail-material/reports',
    name: 'garment-flow-detail-material-report',
    moduleId: './modules/accounting/reports/garment-flow-detail-material-report/index',
    nav: true,
    title: 'Laporan Rekap Bon Keluar Unit (BUK)',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report",
      // permission: { "C9": 1, "PG": 1, "B9": 1, "B1": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
      permission: { "N1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/accounting/reports/flow-penerimaan',
    name: 'flow-penerimaan',
    moduleId: './modules/accounting/reports/flow-penerimaan/index',
    nav: true,
    title: 'Laporan Rekap Bon Terima Unit (BUM)',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report",
      // permission: { "B1": 1, "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
      permission: { "N2": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: 'accounting/accounting-stock-report',
    name: 'accounting-stock-report',
    moduleId: './modules/accounting/reports/accounting-stock-report/index',
    nav: true,
    title: 'Laporan Stok Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N3": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },

  {
    route: '/garment-production/monitoring-prepare-bookkeeping',
    name: 'garment-production-monitoring-prepare-bookkeeping',
    moduleId: './modules/garment-production/monitoring-prepare-bookkeeping/index',
    nav: true,
    title: 'Monitoring Prepare Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N4": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-production/monitoring-cutting-bookkeeping',
    name: 'garment-production-monitoring-cutting-bookkeeping',
    moduleId: './modules/garment-production/monitoring-cutting-bookkeeping/index',
    nav: true,
    title: 'Monitoring Cutting Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N5": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-production/monitoring-loading-bookkeeping',
    name: 'garment-production-monitoring-loading-bookkeeping',
    moduleId: './modules/garment-production/monitoring-loading-bookkeeping/index',
    nav: true,
    title: 'Monitoring Loading Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N6": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-production/monitoring-sewing-bookkeeping',
    name: 'garment-production-monitoring-sewing-bookkeeping',
    moduleId: './modules/garment-production/monitoring-sewing-bookkeeping/index',
    nav: true,
    title: 'Monitoring Sewing Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N7": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-production/monitoring-finishing-bookkeeping',
    name: 'garment-production-monitoring-finishing-bookkeeping',
    moduleId: './modules/garment-production/monitoring-finishing-bookkeeping/index',
    nav: true,
    title: 'Monitoring Finishing Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N8": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-production/monitoring-expenditure-good-delivery-bookkeeping',
    name: 'garment-production-monitoring-expenditure-good-delivery-bookkeeping',
    moduleId: './modules/garment-production/monitoring-expenditure-good-delivery-bookkeeping/index',
    nav: true,
    title: 'Monitoring Pengiriman Barang Jadi Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-production/monitoring-production-flow-by-size-bookkeeping',
    name: 'garment-production-monitoring-production-flow-by-size-bookkeeping',
    moduleId: './modules/garment-production/monitoring-production-flow-by-size-bookkeeping/index',
    nav: true,
    title: 'Monitoring Flow Produksi per Size Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N10": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },

  {
    route: '/garment-production/monitoring-production-stock-flow-bookkeeping',
    name: 'garment-production-monitoring-production-stock-flow-bookkeeping',
    moduleId: './modules/garment-production/monitoring-production-stock-flow-bookkeeping/index',
    nav: true,
    title: 'Monitoring Flow Persediaan Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N11": 1 },

      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'garment-purchasing-book-report-local',
    name: 'garment-purchasing-book-report-local',
    moduleId: './modules/garment-finance/reports/garment-purchasing-book-report-local/index',
    nav: true,
    title: 'Laporan Buku Pembelian Lokal',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N12": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'garment-purchasing-book-report-local-foreign-currency',
    name: 'garment-purchasing-book-report-local-foreign-currency',
    moduleId: './modules/garment-finance/reports/garment-purchasing-book-report-local-foreign-currency/index',
    nav: true,
    title: 'Laporan Buku Pembelian Lokal Valas',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N13": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'garment-purchasing-book-report-import',
    name: 'garment-purchasing-book-report-import',
    moduleId: './modules/garment-finance/reports/garment-purchasing-book-report-import/index',
    nav: true,
    title: 'Laporan Buku Pembelian Import',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N14": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'master-pembukuan',
    name: 'master-pembukuan',
    moduleId: './modules/garment-finance/master-pembukuan/index',
    nav: true,
    title: 'Master Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      // permission: { "C9": 1, "B1": 1, "B12": 1 },
      permission: { "N15": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'accounting/memo-garment-puchasing',
    name: 'memo-garment-puchasing',
    moduleId: './modules/accounting/memo-garment-purchasing/index',
    nav: true,
    title: 'Memorial Pembelian Job Garment',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      // permission: { "B1": 1, "C9": 1, "B12": 1 },
      permission: { "N16": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'accounting/reports/memo-garment-purchasing-report',
    name: 'memo-garment-puchasing-report',
    moduleId: './modules/accounting/reports/memo-garment-purchasing-report/index',
    nav: true,
    title: 'Laporan Memo Pembelian Job Garment',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      // permission: { "B1": 1, "C9": 1, "B12": 1 },
      permission: { "N17": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "accounting/garment-purchasing-job-memo-details",
    name: "garment-purchasing-job-memo-details",
    moduleId: "./modules/accounting/garment-purchasing-job-memo-details/index",
    nav: true,
    title: "Rincian Memorial Pembelian Job Garment",
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      // permission: { "C9": 1, "B12": 1, "B1": 1 },
      permission: { "N18": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "accounting/reports-garment-purchasing-job-memo-details",
    name: "reports-garment-purchasing-job-memo-details",
    moduleId: "./modules/accounting/reports/report-garment-purchasing-job-memo-details/index",
    nav: true,
    title: "Laporan Rincian Memorial Pembelian Job Garment",
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "accounting garment",
      // permission: { "C9": 1, "B12": 1, "B1": 1 },
      permission: { "N19": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "accounting/purchasing-memo-detail-textile",
    name: "purchasing-memo-detail-textile",
    moduleId: "./modules/accounting/purchasing-memo-detail-textile/index",
    nav: true,
    title: "Rincian Memo Pembelian Textile",
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "C9": 1 },
      permission: { "N42": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "accounting/purchasing-memo-textile",
    name: "purchasing-memo-textile",
    moduleId: "./modules/accounting/purchasing-memo-textile/index",
    nav: true,
    title: "Memo Pembelian Textile",
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "C9": 1 },
      permission: { "N43": 1 },
      iconClass: "fa fa-dashboard",
    }
  },

  {
    route: "accounting/revise-create-date-unit-receipt-note",
    name: "revise-create-date-unit-receipt-note",
    moduleId: "./modules/accounting/revise-create-date-unit-receipt-note/index",
    nav: true,
    title: "Fitur Ubah Tanggal BUM",
    auth: true,
    settings: {
      group: "accounting",
      // permission: { "B1": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },

  {
    route: "accounting/revise-date-urn-uen",
    name: "revise-date-urn-uen",
    moduleId: "./modules/accounting/revise-date-urn-uen/index",
    nav: true,
    title: "Fitur Ubah Tanggal BUK/BUM",
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "fitur",
      // permission: { "B1": 1, "C9": 1 },
      permission: { "N20": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: '/garment-production/monitoring-sample-prepare-bookkeeping',
    name: 'garment-sample-monitoring-sample-prepare-bookkeeping',
    moduleId: './modules/garment-sample/report/monitoring-sample-prepare-bookkeeping/index',
    nav: true,
    title: 'Monitoring Sample Prepare Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report sample",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N21": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/accounting/sample-reports/monitoring-sample-cutting-bookkeeping',
    name: 'garment-sample-monitoring-sample-cutting-bookkeeping',
    moduleId: './modules/accounting/sample-reports/monitoring-sample-cutting-bookkeeping/index',
    nav: true,
    title: 'Monitoring Sample Cutting Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report sample",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N22": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/accounting/sample-reports/monitoring-sample-sewing-bookkeeping',
    name: 'garment-sample-monitoring-sample-sewing-bookkeeping',
    moduleId: './modules/accounting/sample-reports/monitoring-sample-sewing-bookkeeping/index',
    nav: true,
    title: 'Monitoring Sample Sewing Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report sample",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N23": 1 },
      iconClass: 'fa fa-dashboard'
    }
  }, 
  {
    route: '/accounting/sample-reports/monitoring-sample-finishing-bookkeeping',
    name: 'garment-sample-monitoring-sample-finishing-bookkeeping',
    moduleId: './modules/accounting/sample-reports/monitoring-sample-finishing-bookkeeping/index',
    nav: true,
    title: 'Monitoring Sample Finishing Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report sample",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N24": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/accounting/sample-reports/monitoring-sample-expenditure-good-bookkeeping',
    name: 'garment-sample-monitoring-sample-expenditure-good-bookkeeping',
    moduleId: './modules/accounting/sample-reports/monitoring-sample-expenditure-good-bookkeeping/index',
    nav: true,
    title: 'Monitoring Sample Pengiriman Barang Jadi Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report sample",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N25": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/accounting/sample-reports/monitoring-sample-flow-by-size-bookkeeping',
    name: 'garment-sample-monitoring-sample-flow-by-size-bookkeeping',
    moduleId: './modules/accounting/sample-reports/monitoring-sample-flow-by-size-bookkeeping/index',
    nav: true,
    title: 'Monitoring Sample Flow Per Size Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report sample",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N26": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/accounting/sample-reports/monitoring-sample-stock-flow-bookkeeping',
    name: 'garment-sample-monitoring-sample-stock-flow-bookkeeping',
    moduleId: './modules/accounting/sample-reports/monitoring-sample-stock-flow-bookkeeping/index',
    nav: true,
    title: 'Monitoring Sample Persediaan Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report sample",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N27": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/accounting/sample-reports/unit-receipt-note-recap',
    name: 'unit-receipt-note-recap',
    moduleId: './modules/accounting/sample-reports/unit-receipt-note-recap/index',
    nav: true,
    title: 'Laporan Rekap BUM Sample',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report sample",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N28": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/accounting/sample-reports/unit-expenditure-note-recap',
    name: 'unit-receipt-note-recap',
    moduleId: './modules/accounting/sample-reports/unit-expenditure-note-recap/index',
    nav: true,
    title: 'Laporan Rekap BUK Sample',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report sample",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N29": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/accounting/sample-reports/stock-report',
    name: 'sample-stock-report',
    moduleId: './modules/accounting/sample-reports/stock-report/index',
    nav: true,
    title: 'Laporan Stok Sample Pembukuan',
    auth: true,
    settings: {
      group: "accounting",
      subGroup: "report sample",
      // permission: { "C9": 1, "B1": 1 },
      permission: { "N30": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
];