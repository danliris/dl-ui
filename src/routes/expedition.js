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
];
