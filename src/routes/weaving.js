module.exports = [
    {
        route: 'weaving',
        name: 'perintah-produksi',
        moduleId: './modules/weaving/order/index',
        nav: true,
        title: 'Perintah Produksi',
        auth: true,
        settings: {
            group: "weaving",
            permission: { "W1": 1, "W2": 1 , "*": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'weaving/master-kebutuhan-benang',
        name: 'master-kebutuhan-benang',
        moduleId: './modules/weaving/master-kebutuhan-benang/index',
        nav: true,
        title: 'Master Kebutuhan Benang',
        auth: true,
        settings: {
            group: "weaving",
            permission: { "W1": 1, "W2": 1 , "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'weaving/estimasi-bahan-baku',
        name: 'estimasi-bahan-baku',
        moduleId: './modules/weaving/estimasi-bahan-baku/index',
        nav: true,
        title: 'Estimasi Bahan Baku',
        auth: true,
        settings: {
            group: "weaving",
            permission: { "W1": 1, "W2": 1 , "*": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
]