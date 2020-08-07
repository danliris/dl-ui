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
      permission: { "B1": 1, "C9": 1 },
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
      permission: { "B1": 1, "C9": 1 },
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
      permission: { "B1": 1, "C9": 1 },
      iconClass: 'fa fa-clone'
    }
  },
  {
    route: '/accounting/chart-of-accounts-view',
    name: 'chart-of-accounts',
    moduleId: './modules/accounting/chart-of-accounts-view/index',
    nav: true,
    title: 'Chart of Account',
    auth: true,
    settings: {
      group: "accounting",
      permission: { "P1": 1, "P2": 1, "P3": 1, "P4": 1, "P5": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1 },
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
      permission: { "B1": 1, "C9": 1 },
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
      permission: { "B1": 1, "C9": 1 },
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
      permission: { "B1": 1, "C9": 1 },
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
      permission: { "B1": 1, "C9": 1 },
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
      permission: { "B1": 1, "C9": 1 },
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
      permission: { "B1": 1, "C9": 1 },
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
      permission: { "B1": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  }
];
