module.exports = [
    {
        route: 'buyers',
        name: 'buyers',
        moduleId: './modules/master/buyer/index',
        nav: true,
        title: 'Buyer',
        auth: true,
        settings: {
            group: "master",
            roles: ["admin"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'suppliers',
        name: 'suppliers',
        moduleId: './modules/master/supplier/index',
        nav: true,
        title: 'Supplier',
        auth: true,
        settings: {
            group: "master",
            roles: ["admin"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'uoms',
        name: 'uoms',
        moduleId: './modules/master/uom/index',
        nav: true,
        title: 'Satuan',
        auth: true,
        settings: {
            group: "master",
            roles: ["admin"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'products',
        name: 'products',
        moduleId: './modules/master/product/index',
        nav: true,
        title: 'Barang',
        auth: true,
        settings: {
            group: "master",
            roles: ["admin"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'vats',
        name: 'vats',
        moduleId: './modules/master/vat/index',
        nav: true,
        title: 'Pajak PPH',
        auth: true,
        settings: {
            group: "master",
            roles: ["admin"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'budgets',
        name: 'budgets',
        moduleId: './modules/master/budget/index',
        nav: true,
        title: 'Budget',
        auth: true,
        settings: {
            group: "master",
            roles: ["admin"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'currencies',
        name: 'currencies',
        moduleId: './modules/master/currency/index',
        nav: true,
        title: 'Mata Uang',
        auth: true,
        settings: {
            group: "master",
            roles: ["admin"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'divisions',
        name: 'divisions',
        moduleId: './modules/master/division/index',
        nav: true,
        title: 'Divisi',
        auth: true,
        settings: {
            group: "master",
            roles: ["admin"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'categories',
        name: 'categories',
        moduleId: './modules/master/category/index',
        nav: true,
        title: 'Kategori',
        auth: true,
        settings: {
            group: "master",
            roles: ["admin"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'units',
        name: 'units',
        moduleId: './modules/master/unit/index',
        nav: true,
        title: 'Unit',
        auth: true,
        settings: {
            group: "master",
            roles: ["admin"],
            iconClass: 'fa fa-dashboard'
        }
    }]