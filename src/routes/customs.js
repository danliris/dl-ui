module.exports = [
    {
        route: '/customs/monitoring-in',
        name: 'customs-report-in',
        moduleId: './modules/customs/monitoring-in/index',
        nav: true,
        title: 'Laporan Pemasukan',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        },
    },
    {
        route: '/customs/monitoring-expenditure-good',
        name: 'customs-report-in',
        moduleId: './modules/customs/monitoring-barang-jadi/index',
        nav: true,
        title: 'Laporan Pengeluaran Barang Jadi',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        },
    }
]