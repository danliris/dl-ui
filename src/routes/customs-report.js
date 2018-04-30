module.exports = [
    {
        route: '/customs-report/customs-report-in',
        name: 'customs-report',
        moduleId: './modules/customs-report/customs-report-in/index',
        nav: true,
        title: 'Laporan Pemasukan Barang per Dokumen Pabean',
        auth: true,
        settings: {
            group: "customs-report",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }
]