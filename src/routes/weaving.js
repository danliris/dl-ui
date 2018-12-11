module.exports = [
    {
        route: 'weaving',
        name: 'Perintah Produksi',
        moduleId: './modules/weaving/order/index',
        nav: true,
        title: 'Perintah Produksi',
        auth: true,
        settings: {
            group: "weaving",
            permission: { "W1": 1, "W2": 1 , "*": 1},
            iconClass: 'fa fa-dashboard'
        }
    }
]