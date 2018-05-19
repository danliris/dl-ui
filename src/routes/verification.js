module.exports =  [
    {
        route: '/verification/unit-payment-order-verification',
        name: 'purchasing-document-expedition',
        moduleId: './modules/verification/unit-payment-order-verification/index',
        nav: true,
        title: 'Verifikasi Surat Perintah Bayar',
        auth: true,
        settings: {
            group: "verification",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-calendar-check-o'
        }
    },
];
