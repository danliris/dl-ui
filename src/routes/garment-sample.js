module.exports = [
	{
		route: '/garment-sample/unit-receipt-note-by-user',
		name: 'unit-receipt-note',
		moduleId: './modules/garment-sample/unit-receipt-note-by-user/index',
		nav: true,
		title: 'Bon Terima Unit',
		auth: true,
		settings: {
			group: "g-sample",
			permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1, "SMP1": 1 },
			iconClass: 'fa fa-dashboard'
		}
	},
]