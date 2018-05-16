module.exports =  [
    {
        route: '/expedition/purchasing-to-verification',
        name: 'purchasing-to-verification',
        moduleId: './modules/expedition/purchasing-to-verification/index',
        nav: true,
        title: 'Ekspedisi Penyerahan ke Verifikasi',
        auth: true,
        settings: {
            group: "expedition",
            permission: { "C5": 1, "C9": 1 },
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
            group: "expedition",
            permission: { "C5": 1, "C9": 1 },
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
            group: "expedition",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-clone'
        }
    },
];
