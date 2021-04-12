module.exports = [
  {
    route: '/garment-finance/garment-purchasing-to-verification',
    name: 'garment-purchasing-to-verification',
    moduleId: './modules/garment-finance/garment-purchasing-to-verification/index',
    nav: true,
    title: 'Ekspedisi Penyerahan ke Verifikasi',
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "B11": 1, "C9": 1, "PG":1, "APG":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-finance/garment-purchasing-document-expedition-acceptance',
    name: 'garment-purchasing-document-expedition-acceptance',
    moduleId: './modules/garment-finance/garment-purchasing-document-expedition-acceptance/index',
    nav: true,
    title: 'Penerimaan Dokumen Pembelian Garment',
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "B13": 1, "C9": 1, "B12": 1, "B11": 1, "PG":1, "APG":1, "B9":1, "B4":1, "B1":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-finance/garment-purchasing-verification',
    name: 'garment-purchasing-verification',
    moduleId: './modules/garment-finance/garment-purchasing-verification/index',
    nav: true,
    title: 'Verifikasi Nota Intern',
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "B13": 1, "C9": 1, "B9":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-finance/garment-purchasing-expedition-report',
    name: 'garment-purchasing-expedition-report',
    moduleId: './modules/garment-finance/garment-purchasing-expedition-report/index',
    nav: true,
    title: 'Laporan Ekspedisi Pembelian Garment',
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "B13": 1, "C9": 1, "B12": 1, "B11": 1, "PG":1, "APG":1, "B9":1, "B4":1, "B1":1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/dpp-vat-bank-expenditure-note",
    name: "garment-finance-dpp-vat-bank-expenditure-note",
    moduleId: "./modules/garment-finance/dpp-vat-bank-expenditure-note/index",
    nav: true,
    title: "Bukti Pengeluaran Bank DPP + PPN",
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "C9": 1, "B4":1, "B11": 1},
      iconClass: 'fa fa-dashboard'
    },
  },
  {
    route: "/garment-finance/garment-bank-expenditure-note-dpp-ppn-report",
    name: "garment-bank-expenditure-note-dpp-ppn-report",
    moduleId:
      "./modules/garment-finance/garment-bank-expenditure-note-dpp-ppn-report/index",
    nav: true,
    title: "Laporan Bukti Pengeluaran Bank DPP + PPN",
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "C9": 1, "B4":1, "B11": 1},
      iconClass: 'fa fa-dashboard'
    },
  },
  {
    route: "/garment-finance/garment-purchasing-pph-bank-expenditure-note",
    name: "garment-purchasing-pph-bank-expenditure-note",
    moduleId: "./modules/garment-finance/garment-purchasing-pph-bank-expenditure-note/index",
    nav: true,
    title: "Pengajuan Pembayaran PPH",
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "C9": 1, "B4":1, "B11": 1},
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-finance/garment-pph-bank-expenditure-note-report",
    name: "garment-pph-bank-expenditure-note-report",
    moduleId: "./modules/garment-finance/garment-pph-bank-expenditure-note-report/index",
    nav: true,
    title: "Laporan Pengajuan Pembayaran PPH",
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "C9": 1, "B4":1, "B11": 1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/garment-purchasing-debt-balance",
    name: "garment-purchasing-debt-balance",
    moduleId: "./modules/garment-finance/garment-purchasing-debt-balance/index",
    nav: true,
    title: "Kartu Hutang",
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "C9": 1, "B4":1, "B11": 1, "B1":1, "B12": 1},
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/reports/garment-debt-balance-local",
    name: "garment-debt-balance-local",
    moduleId: "./modules/garment-finance/reports/garment-debt-balance-local/index",
    nav: true,
    title: "Saldo Hutang Lokal",
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "B13": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/reports/garment-purchasing-debt-balance-local-foreign",
    name: "garment-purchasing-debt-balance-local-foreign",
    moduleId: "./modules/garment-finance/reports/garment-purchasing-debt-balance-local-foreign/index",
    nav: true,
    title: "Saldo Hutang Lokal Valas",
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "B13": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/reports/garment-debt-balance-import",
    name: "garment-debt-balance-import",
    moduleId: "./modules/garment-finance/reports/garment-debt-balance-import/index",
    nav: true,
    title: "Saldo Hutang Impor",
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "B13": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/reports/garment-debt-detail-report",
    name: "garment-debt-detail-report",
    moduleId: "./modules/garment-finance/reports/garment-debt-detail-report/index",
    nav: true,
    title: "Laporan Rincian Hutang",
    auth: true,
    settings: {
      group: "g-finance",
      permission: { "B13": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: "/garment-finance/garment-disposition-to-verification",
    name: "garment-disposition-to-verification",
    moduleId: "./modules/garment-finance/garment-disposition-to-verification/index",
    nav: true,
    title: "Ekspedisi Penyerahan Disposisi ke Verifikasi",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: {
        P1: 1,
        P2: 1,
        P3: 1,
        P4: 1,
        P5: 1,
        P6: 1,
        P7: 1,
        PI: 1,
        PG: 1,
        PK: 1,
        C9: 1,
      },
      iconClass: "fa fa-clone",
    }
  },
  {
    route: "/garment-finance/garment-disposition-verification",
    name: "garment-disposition-verification",
    moduleId: "./modules/garment-finance/garment-disposition-verification/index",
    nav: true,
    title: "Verifikasi Disposisi Garment",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: {
        P1: 1,
        P2: 1,
        P3: 1,
        P4: 1,
        P5: 1,
        P6: 1,
        P7: 1,
        PI: 1,
        PG: 1,
        PK: 1,
        C9: 1,
      },
      iconClass: "fa fa-clone",
    },
  },
  {
    route: "garment-finance/garment-disposition-document-expedition-acceptance",
    name: "garment-disposition-document-expedition-acceptance",
    moduleId: "./modules/garment-finance/garment-disposition-document-expedition-acceptance/index",
    nav: true,
    title: "Penerimaan Dokumen Disposisi Pembayaran",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: { "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-finance/payment-disposition-note",
    name: "payment-disposition-note",
    moduleId: "./modules/garment-finance/payment-disposition-note/index",
    nav: true,
    title: "Bukti Pembayaran Disposisi",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: { "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/reports/garment-disposition-payment-expedition",
    name: "garment-disposition-payment-expedition-report",
    moduleId: "./modules/garment-finance/reports/garment-disposition-payment-expedition/index",
    nav: true,
    title: "Laporan Ekspedisi Bukti Pembayaran Disposisi",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: { "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "C9": 1 },
      iconClass: "fa fa-dashboard",
    }
  },
  {
    route: "garment-finance/reports/down-payment-report",
    name: "down-paymant-report",
    moduleId: "./modules/garment-finance/reports/down-payment-report/index",
    nav: true,
    title: "Laporan Uang Muka",
    auth: true,
    settings: {
      group: "g-finance",
      subGroup: "ekspedisi disposisi",
      permission: {"C9": 1},
      iconClass: "fa fa-dashboard",
    }
  }
  // {
  //     route: '/garment-finance/garment-purchasing-expedition-report',
  //     name: 'garment-purchasing-expedition-report',
  //     moduleId: './modules/garment-finance/garment-purchasing-expedition-report/index',
  //     nav: true,
  //     title: 'Laporan Ekspedisi Pembelian Garment',
  //     auth: true,
  //     settings: {
  //         group: "g-finance",
  //         permission: { "B13": 1, "C9": 1 },
  //         iconClass: 'fa fa-dashboard'
  //     }
  // },

]
