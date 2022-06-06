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
            permission: { "C9": 1,"B6": 1,"B1": 1 },
            iconClass: 'fa fa-dashboard'
        },
    },
    {
        route: '/customs/monitoring-expenditure-good',
        name: 'customs-report-expenditure-good',
        moduleId: './modules/customs/monitoring-barang-jadi/index',
        nav: true,
        title: 'Laporan Pengeluaran Barang Jadi',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C9": 1,"B6": 1,"B1": 1  },
            iconClass: 'fa fa-dashboard'
        },
    },
    {
        route: '/customs/monitoring-out',
        name: 'customs-report-out',
        moduleId: './modules/customs/monitoring-out/index',
        nav: true,
        title: 'Laporan Pengeluaran',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C9": 1,"B6": 1,"B1": 1  },
            iconClass: 'fa fa-dashboard'
        },
    },
    {
        route: '/customs/traceable-in',
        name: 'customs-report-in',
        moduleId: './modules/customs/traceable-in/index',
        nav: true,
        title: 'Laporan Traceable Masuk',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C9": 1,"B6": 1,"B1": 1 },
            iconClass: 'fa fa-dashboard'
        },
    },

  {
        route: '/customs/traceable-out',
        name: 'customs-report-out',
        moduleId: './modules/customs/traceable-out/index',
        nav: true,
        title: 'Laporan Traceable Keluar',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C9": 1,"B6": 1,"B1": 1 },
            iconClass: 'fa fa-dashboard'
        },

    },
    {

        route: '/customs/wip',
        name: 'customs-report-in',
        moduleId: './modules/customs/laporan-wip-position/index',
        nav: true,
        title : 'Laporan Posisi WIP',
        auth : true,
        settings : {
            group : "customs",
            permission : {"C9": 1,"B6": 1,"B1": 1},
            iconClass : 'fa fa-dashboard'
        }
    },
    {
        route: '/customs/bc-23',
        name: 'bc-23',
        moduleId: './modules/customs/laporan-bc-23/index',
        nav: true,
        title: 'Laporan BC 23',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C9": 1,"B6": 1,"B1": 1 },
            iconClass: 'fa fa-dashboard'
        },

    },

     {
        route: '/customs/beacukai_temp',
        name: 'customs-beacukaitemp',
        moduleId: './modules/customs-report/beacukai_temp/index',
        nav: true,
        title: 'Posting BC-23 dan BC-27',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C9": 1,"PG": 1,"B1": 1 },
            iconClass: 'fa fa-dashboard'
        }

    },

    {
        route: '/customs/realization-bom',
        name: 'monitoring-realization-bom',
        moduleId: './modules/customs/realization_bom/index',
        nav: true,
        title: 'Laporan Monitoring BOM (Bill of Material)',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C9": 1,"B6": 1,"B1": 1 },
            iconClass: 'fa fa-dashboard'
        },

    },

    {
        route: '/customs/pemasukan-tc-kecil',
        name: 'monitoring-pemasukan-tc-kecil',
        moduleId: './modules/customs/tc-kecil-in/index',
        nav: true,
        title: 'Laporan Monitoring Pemasukan Aval TC Kecil',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C9": 1,"B6": 1,"B1": 1 },
            iconClass: 'fa fa-dashboard'
        },

    },
    {
        route: '/customs/pengeluaran-tc-kecil',
        name: 'monitoring-pengeluaran-tc-kecil',
        moduleId: './modules/customs/tc-kecil-out/index',
        nav: true,
        title: 'Laporan Monitoring Pengeluaran Aval TC Kecil',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C9": 1,"B6": 1,"B1": 1 },
            iconClass: 'fa fa-dashboard'
        },

    },
    
    {
        route: '/customs/pemasukan-sampah-sapuan',
        name: 'monitoring-pemasukan-sampah-sapuan',
        moduleId: './modules/customs/sapuan-in/index',
        nav: true,
        title: 'Laporan Monitoring Pemasukan Aval Sampah Sapuan',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C9": 1,"B6": 1,"B1": 1 },
            iconClass: 'fa fa-dashboard'
        },

    },
    {
        route: '/customs/pengeluaran-sampah-sapuan',
        name: 'monitoring-pengeluaran-sampah-sapuan',
        moduleId: './modules/customs/sapuan-out/index',
        nav: true,
        title: 'Laporan Monitoring Pengeluaran Aval Sampah Sapuan',
        auth: true,
        settings: {
            group: "customs",
            permission: { "C9": 1,"B6": 1,"B1": 1 },
            iconClass: 'fa fa-dashboard'
        },

    },

]