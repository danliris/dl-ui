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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R1":1},
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
			subGroup: "md",
			// permission: { "C9": 1, "PGA":1 },
			permission :{"R4":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
    route: '/garment-sample/service-sample-cutting',
    name: 'service-sample-cutting',
    moduleId: './modules/garment-sample/garment-service-sample-cutting/index',
    nav: true,
    title: 'Sample Jasa - Komponen',
    auth: true,
    settings: {
      group: "g-sample",
      subGroup: "packing list sample",
      // permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      permission: { "R38": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-sample/service-sample-sewing',
    name: 'sample-sewing',
    moduleId: './modules/garment-sample/garment-service-sample-sewing/index',
    nav: true,
    title: 'Sample Jasa - Garment Wash',
    auth: true,
    settings: {
      group: "g-sample",
      subGroup: "packing list sample",
      // permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      permission: { "R39": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-sample/service-sample-expenditure-good',
    name: 'sample-expenditure-good',
    moduleId: './modules/garment-sample/garment-service-sample-expenditure-good/index',
    nav: true,
    title: 'Sample Jasa - Barang Jadi',
    auth: true,
    settings: {
      group: "g-sample",
      subGroup: "packing list sample",
      // permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      permission: { "R40": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-sample/service-sample-shrinkage-panel',
    name: 'service-sample-shrinkage-panel',
    moduleId: './modules/garment-sample/garment-service-sample-shrinkage-panel/index',
    nav: true,
    title: 'Sample BB - Shrinkage / Panel',
    auth: true,
    settings: {
      group: "g-sample",
      subGroup: "packing list sample",
      // permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      permission: { "R41": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-sample/fabric-wash',
    name: 'sample-fabric-wash',
    moduleId: './modules/garment-sample/garment-service-fabric-wash/index',
    nav: true,
    title: 'Sample BB - Fabric Wash/Print',
    auth: true,
    settings: {
      group: "g-sample",
      subGroup: "packing list sample",
      // permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      permission: { "R42": 1 },
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R2":1},
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R3":1},
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R8":1},
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R9":1},
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R10":1},
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R11":1},
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R12":1},
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R13":1},
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R14":1},
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R15":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-finishing-out',
		name: 'sample-finishing-out',
		moduleId: './modules/garment-sample/sample-finishing-out/index',
		nav: true,
		title: 'Finishing Out Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "transaksi",
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R16":1},			
			iconClass: 'fa fa-dashboard'
		}
	},
	
	{
		route: '/garment-sample/sample-expenditure-good',
		name: 'garment-sample-expenditure-good',
		moduleId: './modules/garment-sample/sample-expenditure-good/index',
		nav: true,
		title: 'Pengeluaran Barang Jadi Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "transaksi",
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R17":1},
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R18":1},
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
			// permission: { "C9": 1, "SMP1": 1 },
			permission: { "C9": 1, "SMP1": 1 },
			permission :{"R19":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	
	{
		route: '/garment-sample/delivered-packing-list-sample',
		name: 'garment-delivered-packing-list-sample',
		moduleId: './modules/garment-sample/delivered-packing-list-sample/index',
		nav: true,
		title: 'Delivered Packing list Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "transaksi",
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R20":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	
	{
		route: '/garment-sample/report/monitoring-unit-receipt-note-all',
		name: 'unit-receipt-note',
		moduleId: './modules/garment-sample/report/monitoring-unit-receipt-note-all/index',
		nav: true,
		title: 'Monitoring Bon Terima Unit All Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "laporan",
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R21":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/report/garment-unit-flow-penerimaan-report',
		name: '/garment-unit-flow-penerimaan-report',
		moduleId: './modules/garment-sample/report/garment-unit-flow-penerimaan-report/index',
		nav: true,
		title: 'Laporan Flow Penerimaan Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "laporan",
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R22":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/report/laporan-flow-pengeluaran',
		name: 'laporan-flow-pengeluaran',
		moduleId: './modules/garment-sample/report/garment-unit-flow-detail-material-report/index',
		nav: true,
		title: 'Laporan Flow Pengeluaran Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "laporan",
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R23":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: 'garment-stock-sample-report',
		name: 'garment-stock-sample-report',
		moduleId: './modules/garment-sample/report/garment-stock-report/index',
		nav: true,
		title: 'Laporan Stock Gudang Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "laporan",
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R24":1},
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
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R25":1},
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
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R26":1},
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
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R27":1},
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
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R28":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: 'sample-finishing-monitoring',
		name: 'sample-finishing-monitoring',
		moduleId: './modules/garment-sample/report/sample-finishing-monitoring/index',
		nav: true,
		title: 'Monitoring Finishing Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "laporan",
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R29":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: 'sample-finishing-monitoring-by-color',
		name: 'sample-finishing-monitoring-by-color',
		moduleId: './modules/garment-sample/report/sample-finishing-monitoring-by-color/index',
		nav: true,
		title: 'Monitoring Finishing Sample By Color',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "laporan",
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R30":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: 'sample-expenditure-good-delivery-monitoring',
		name: 'sample-expenditure-good-delivery-monitoring',
		moduleId: './modules/garment-sample/report/sample-expenditure-good-delivery-monitoring/index',
		nav: true,
		title: 'Monitoring Pengiriman Barang Jadi Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "laporan",
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R31":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/feature/change-date-feature',
		name: 'garment-production-change-date-feature',
		moduleId: './modules/garment-sample/feature/change-date-feature/index',
		nav: true,
		title: 'Fitur Ubah Tanggal',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "fitur",
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R36":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
        route: '/garment-sample/sample-flow-feature',
        name: 'garment-sample-flow-feature',
        moduleId: './modules/garment-sample/sample-flow-feature/index',
        nav: true,
        title: 'Fitur Flow Barang Sample',
        auth: true,
        settings: {
            group: "g-sample",
            subGroup: "fitur",
			// permission: { "C9": 1, "SMP1": 1 },
			permission :{"R37":1},
            iconClass: 'fa fa-dashboard'
        }
    },
	{
		route: '/garment-sample/packing-list-sample-md',
		name: 'garment-packing-list-sample-md',
		moduleId: './modules/garment-sample/packing-list-sample-md/index',
		nav: true,
		title: 'Packing list Sample - Md',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "md",
			// permission: { "C9": 1, "PGA": 1 },
			permission :{"R5":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/feature/sample-request-copy',
		name: 'garment-sample-request-copy',
		moduleId: './modules/garment-sample/feature/sample-request-copy/copy/index',
		nav: true,
		title: 'Copy Surat Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "md",
			// permission: { "C9": 1, "PGA": 1 },
			permission :{"R6":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	
	{
		route: '/garment-sample/sample-receipt-from-buyer',
		name: 'garment-sample-receipt-from-buyer',
		moduleId: './modules/garment-sample/sample-receipt-from-buyer/index',
		nav: true,
		title: 'Penerimaan Barang Jadi Sample Dari Buyer',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "md",
			// permission: { "C9": 1, "PGA": 1 },
			permission :{"R7":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: 'monitoring-sample-flow-by-size',
		name: 'monitoring-sample-flow-by-size',
		moduleId: './modules/garment-sample/report/monitoring-sample-flow-by-size/index',
		nav: true,
		title: 'Monitoring Flow  Sample per Size',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "laporan",
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R32":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: 'monitoring-sample-stock-flow',
		name: 'monitoring-sample-stock-flow',
		moduleId: './modules/garment-sample/report/monitoring-sample-stock-flow/index',
		nav: true,
		title: 'Monitoring Flow Persediaan Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "laporan",
			// permission: { "C9": 1, "SMP1": 1, "B12":1 },
			permission :{"R33":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: '/garment-sample/sample-archive-report',
		name: 'sample-archive-report',
		moduleId: './modules/garment-sample/report/sample-archive-report/index',
		nav: true,
		title: 'Laporan Arsip Sample/MD',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "laporan",
			// permission: { "C9": 1, "SMP1": 1, "B12":1, "PGA":1 },
			permission :{"R34":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	{
		route: 'monitoring-sample-delivered-packing-list',
		name: 'monitoring-sample-delivered-packing-list',
		moduleId: './modules/garment-sample/report/monitoring-sample-delivered-packing-list/index',
		nav: true,
		title: 'Monitoring Delivered Packing List Sample',
		auth: true,
		settings: {
			group: "g-sample",
			subGroup: "laporan",
			// permission: { "C9": 1, "SMP1": 1, "B12":1, "PGA":1 },
			permission :{"R35":1},
			iconClass: 'fa fa-dashboard'
		}
	},
	
	
]