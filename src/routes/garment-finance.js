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
            permission: { "B11": 1, "C9": 1 },
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
            permission: { "B13": 1, "C9": 1, "B12": 1, "B11": 1 },
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
            permission: { "B13": 1, "C9": 1 },
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
            permission: { "B13": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
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
          permission: { "B13": 1, "C9": 1 },
          iconClass: "fa fa-dashboard",
        },
      },
]