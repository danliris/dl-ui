module.exports = [
    {
        route: '/garment-subcon/subcon-contract',
        name: 'subcon-contract',
        moduleId: './modules/garment-subcon/garment-subcon-contract/index',
        nav: true,
        title: 'Subcon Contract',
        auth: true,
        settings: {
            group: "g-subcon",
            permission: { "E": 1, "K": 1, "C9": 1,  "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1,  "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
]