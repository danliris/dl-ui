module.exports = [
    {
        route: '/garment-finance/garment-purchasing-to-verification',
        name: 'garment-purchasing-to-verification',
        moduleId: './modules/garment-finance/garment-purchasing-to-verification/index',
        nav: true,
        title: 'Penyerahan Garment',
        auth: true,
        settings: {
            group: "g-finance",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PI": 1, "PG": 1, "PK": 1, "C9": 1, "B9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
]