module.exports =  [
    {
        route: '/expedition/purchasing-document-expedition',
        name: 'purchasing-document-expedition',
        moduleId: './modules/expedition/purchasing-document-expedition/index',
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
