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
