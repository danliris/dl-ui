module.exports = [
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
  },
  {
    route: "weaving/master-yarn",
    name: "master-yarn",
    moduleId: "./modules/weaving/master-yarn/index",
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
    route: "weaving/master-fabric-construction",
    name: "master-fabric-construction",
    moduleId: "./modules/weaving/master-fabric-construction/index",
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
    route: "weaving/order-production",
    name: "order-production",
    moduleId: "./modules/weaving/order-production/index",
    nav: true,
    title: "Surat Perintah Produksi",
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
    title: "Laporan Surat Perintah Produksi",
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
    route: "weaving/master-machine",
    name: "master-machine",
    moduleId: "./modules/weaving/master-machine/index",
    nav: true,
    title: "Master Mesin",
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
