module.exports = [
    {
        route: 'buyers-new',
        name: 'buyers-new',
        moduleId: './modules/master/buyer-new/index',
        nav: true,
        title: 'Buyer',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1, "A2": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'suppliers/budgeting-new',
        name: 'suppliers/budgeting-new',
        moduleId: './modules/master/supplier-budgeting-new/index',
        nav: true,
        title: 'Supplier',
        auth: true,
        settings: {
            group: "master",
            permission: { "C5": 1, "C9": 1, "P1": 7, "P3": 7, "P4": 7, "P6": 7, "P7": 7, "PG": 7 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'suppliers-new',
        name: 'suppliers-new',
        moduleId: './modules/master/supplier-new/index',
        nav: true,
        title: 'Supplier',
        auth: true,
        settings: {
            group: "master",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'uoms-new',
        name: 'uoms-new',
        moduleId: './modules/master/uom-new/index',
        nav: true,
        title: 'Satuan Baru',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'products/budgeting-new',
        name: 'products/budgeting-new',
        moduleId: './modules/master/product-budgeting-new/index',
        nav: true,
        title: 'Barang',
        auth: true,
        settings: {
            group: "master",
            permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'products-new',
        name: 'products-new',
        moduleId: './modules/master/product-new/index',
        nav: true,
        title: 'Barang',
        auth: true,
        settings: {
            group: "master",
            permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "A1": 1, "B9": 1, "A4": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'vats-new',
        name: 'vats-new',
        moduleId: './modules/master/vat-new/index',
        nav: true,
        title: 'Pajak PPH',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'budgets-new',
        name: 'budgets-new',
        moduleId: './modules/master/budget-new/index',
        nav: true,
        title: 'Budget',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'currencies-new',
        name: 'currencies-new',
        moduleId: './modules/master/currency-new/index',
        nav: true,
        title: 'Mata Uang',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'divisions-new',
        name: 'divisions-new',
        moduleId: './modules/master/division-new/index',
        nav: true,
        title: 'Divisi',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'categories-new',
        name: 'categories-new',
        moduleId: './modules/master/category-new/index',
        nav: true,
        title: 'Kategori',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'units-new',
        name: 'units-new',
        moduleId: './modules/master/unit-new/index',
        nav: true,
        title: 'Unit',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }

    },
    {
        route: 'machine-types',
        name: 'machine-types',
        moduleId: './modules/master/machine-type/index',
        nav: true,
        title: 'Jenis Mesin',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'machine-types-new',
        name: 'machine-types-new',
        moduleId: './modules/master/machine-type-new/index',
        nav: true,
        title: '*Jenis Mesin',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1 },
        }
    },
    {
        route: 'machine',
        name: 'machine',
        moduleId: './modules/master/machine/index',
        nav: true,
        title: 'Mesin',
        auth: true,
        settings: {
            group: "master",
            permission: { "C9": 1 },
            iconClass: 'fa fa-dashboard'
        
    }
  }
] 
