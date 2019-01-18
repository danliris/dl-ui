module.exports = [
  {
    route: "weaving",
    name: "order-production",
    moduleId: "./modules/weaving/order-production/index",
    nav: true,
    title: "Perintah Produksi",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/fabric-specification",
    name: "fabric-specification",
    moduleId: "./modules/weaving/fabric-specification/index",
    nav: true,
    title: "Master Kebutuhan Benang",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/estimated-production",
    name: "estimated-production",
    moduleId: "./modules/weaving/estimated-production/index",
    nav: true,
    title: "Estimasi Produksi",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/yarn",
    name: "yarn",
    moduleId: "./modules/weaving/yarn/index",
    nav: true,
    title: "Master Benang",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/order-production-report",
    name: "order-production-report",
    moduleId: "./modules/weaving/order-production-report/index",
    nav: true,
    title: "Laporan Surat Order Produksi",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/master-material-type",
    name: "master-material-type",
    moduleId: "./modules/weaving/master-material-type/index",
    nav: true,
    title: "Master Material",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/master-ring",
    name: "master-ring",
    moduleId: "./modules/weaving/master-ring/index",
    nav: true,
    title: "Master Ring",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  }
  // {
  //     route: 'weaving/estimasi-bahan-baku',
  //     name: 'estimasi-bahan-baku',
  //     moduleId: './modules/weaving/estimasi-bahan-baku/index',
  //     nav: true,
  //     title: 'Estimasi Bahan Baku',
  //     auth: true,
  //     settings: {
  //         group: "weaving",
  //         permission: { "W1": 1, "W2": 1 , "*": 1 },
  //         iconClass: 'fa fa-dashboard'
  //     }
  // }
];
