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
