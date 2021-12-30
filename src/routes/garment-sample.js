module.exports = [
	{
		route: '/garment-sample/unit-receipt-note-by-user',
		name: 'unit-receipt-note',
		moduleId: './modules/garment-sample/unit-receipt-note-by-user/index',
		nav: true,
		title: 'Bon Terima Unit Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "gudang sample",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-request',
		name: 'sample-request',
		moduleId: './modules/garment-sample/sample-request/index',
		nav: true,
		title: 'Surat Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "transaksi",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-receipt',
		name: 'sample-receipt',
		moduleId: './modules/garment-sample/sample-receipt/index',
		nav: true,
		title: 'Penerimaan Surat Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "transaksi",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/unit-delivery-order-by-user',
		name: 'unit-delivery-order',
		moduleId: './modules/garment-sample/unit-delivery-order-by-user/index',
		nav: true,
		title: 'Unit Delivery Order',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "gudang sample",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/unit-expenditure-note-by-user',
		name: 'unit-expenditure-note',
		moduleId: './modules/garment-sample/unit-expenditure-note-by-user/index',
		nav: true,
		title: 'Bon Pengeluaran Unit',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "gudang sample",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-preparing',
		name: 'sample-preparing',
		moduleId: './modules/garment-sample/sample-preparing/index',
		nav: true,
		title: 'Preparing Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "transaksi",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-cutting-in',
		name: 'sample-cutting-in',
		moduleId: './modules/garment-sample/sample-cutting-in/index',
		nav: true,
		title: 'Cutting In Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "transaksi",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-cutting-out',
		name: 'sample-cutting-out',
		moduleId: './modules/garment-sample/sample-cutting-out/index',
		nav: true,
		title: 'Cutting Out Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "transaksi",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-sewing-in',
		name: 'sample-sewing-in',
		moduleId: './modules/garment-sample/sample-sewing-in/index',
		nav: true,
		title: 'Sewing In Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "transaksi",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-sewing-out',
		name: 'sample-sewing-out',
		moduleId: './modules/garment-sample/sample-sewing-out/index',
		nav: true,
		title: 'Sewing Out Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "transaksi",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-finishing-in',
		name: 'sample-finishing-in',
		moduleId: './modules/garment-sample/sample-finishing-in/index',
		nav: true,
		title: 'Finishing In Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "transaksi",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},

	{
		route: '/garment-sample/report/monitoring-sample-prepare',
		name: 'monitoring-sample-prepare',
		moduleId: './modules/garment-sample/report/monitoring-sample-prepare/index',
		nav: true,
		title: 'Monitoring Preparing Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "laporan",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/report/monitoring-receipt-sample',
		name: 'monitoring-sample-receipt',
		moduleId: './modules/garment-sample/report/monitoring-receipt-sample/index',
		nav: true,
		title: 'Monitoring Penerimaan Surat Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "laporan",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-delivery-return',
		name: 'sample-delivery-return',
		moduleId: './modules/garment-sample/sample-delivery-return/index',
		nav: true,
		title: 'Retur Proses Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "transaksi",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-aval-product',
		name: 'sample-aval-product',
		moduleId: './modules/garment-sample/sample-aval-product/index',
		nav: true,
		title: 'Aval Kain Besar Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "transaksi",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-aval-component',
		name: 'sample-aval-component',
		moduleId: './modules/garment-sample/sample-aval-component/index',
		nav: true,
		title: 'Aval Komponen Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "transaksi",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/report/sample-cutting-monitoring',
		name: '/sample-cutting-monitoring',
		moduleId: './modules/garment-sample/report/sample-cutting-monitoring/index',
		nav: true,
		title: 'Monitoring Cutting Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "laporan",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/report/sample-sewing-monitoring',
		name: '/sample-sewing-monitoring',
		moduleId: './modules/garment-sample/report/sample-sewing-monitoring/index',
		nav: true,
		title: 'Monitoring Sewing Sample',
		auth: true,
		settings: {
			group: "g-sample",
            subGroup: "laporan",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-aval-product',
		name: 'sample-aval-product',
		moduleId: './modules/garment-sample/sample-aval-product/index',
		nav: true,
		title: 'Aval Kain Besar Sample',
		auth: true,
		settings: {
			group: "g-sample",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},

]