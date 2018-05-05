module.exports = [
    {
        route: '/customs-report/customs-report-in',
        name: 'customs-report-in',
        moduleId: './modules/customs-report/customs-report-in/index',
        nav: true,
        title: 'Laporan Pemasukan Barang per Dokumen Pabean',
        auth: true,
        settings: {
            group: "customs-report",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/customs-report/customs-report-out',
        name: 'customs-report-out',
        name: 'customs-report-out',
        moduleId: './modules/customs-report/customs-report-out/index',
        nav: true,
        title: 'Laporan Pengeluaran Barang per Dokumen Pabean',
        auth: true,
        settings: {
            group: "customs-report",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/customs-report/wip',
        name: 'customs-report',
        moduleId: './modules/customs-report/wip/index',
        nav: true,
        title: 'Laporan Posisi WIP',
        auth: true,
        settings: {
            group: "customs-report",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }

    },
    {
        route: '/customs-report/finished-good',
        name: 'customs-report',
        moduleId: './modules/customs-report/finished-good/index',
        nav: true,
        title: 'Laporan Pertanggungjawaban Mutasi Barang Jadi',
        auth: true,
        settings: {
            group: "customs-report",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }

    },{
        route: '/customs-report/machine-mutation',
        name: 'customs-report',
        moduleId: './modules/customs-report/machine-mutation/index',
        nav: true,
        title: 'Laporan Pertanggungjawaban Mutasi Mesin dan Peralatan',
        auth: true,
        settings: {
            group: "customs-report",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }

    },
    {
        route: '/customs-report/scrap',
        name: 'customs-report-scrap',
        moduleId: './modules/customs-report/scrap/index',
        nav: true,
        title: 'Laporan Pertanggungjawaban Barang Reject dan Scrap',
        auth: true,
        settings: {
            group: "customs-report",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }

    },
    {
        route: '/customs-report/fact-item-mutation-bb-unit',
        name: 'customs-report-item-mutation-bb-unit',
        moduleId: './modules/customs-report/fact-item-mutation-bb-unit/index',
        nav: true,
        title: 'Laporan Pertanggungjawaban Mutasi Bahan Baku Unit',
        auth: true,
        settings: {
            group: "customs-report",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }

    },
    {
        route: '/customs-report/fact-item-mutation-bp-unit',
        name: 'customs-report-item-mutation-bp-unit',
        moduleId: './modules/customs-report/fact-item-mutation-bp-unit/index',
        nav: true,
        title: 'Laporan Pertanggungjawaban Mutasi Bahan Penolong Unit',
        auth: true,
        settings: {
            group: "customs-report",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }

    }
]
