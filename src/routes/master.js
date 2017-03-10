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
      permission: { "C9": 1, "A2": 1 },
      iconClass: 'fa fa-dashboard'
    }
  }, {
    route: 'suppliers/budgeting',
    name: 'suppliers/budgeting',
    moduleId: './modules/master/supplier-budgeting/index',
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
    route: 'suppliers',
    name: 'suppliers',
    moduleId: './modules/master/supplier/index',
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
    route: 'uoms',
    name: 'uoms',
    moduleId: './modules/master/uom/index',
    nav: true,
    title: 'Satuan',
    auth: true,
    settings: {
      group: "master",
      permission: { "C9": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: 'products/budgeting',
    name: 'products/budgeting',
    moduleId: './modules/master/product-budgeting/index',
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
    route: 'products',
    name: 'products',
    moduleId: './modules/master/product/index',
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
    route: 'vats',
    name: 'vats',
    moduleId: './modules/master/vat/index',
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
    route: 'budgets',
    name: 'budgets',
    moduleId: './modules/master/budget/index',
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
    route: 'currencies',
    name: 'currencies',
    moduleId: './modules/master/currency/index',
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
    route: 'divisions',
    name: 'divisions',
    moduleId: './modules/master/division/index',
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
    route: 'categories',
    name: 'categories',
    moduleId: './modules/master/category/index',
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
    route: 'units',
    name: 'units',
    moduleId: './modules/master/unit/index',
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
