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
            permission: { "B13": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
]