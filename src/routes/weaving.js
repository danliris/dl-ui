module.exports = [
  {
    route: "weaving/master-yarn-number",
    name: "master-ring",
    moduleId: "./modules/weaving/master-yarn-number/index",
    nav: true,
    title: "Master Nomor Benang",
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
    route: "weaving/master-yarn-origin",
    name: "master-yarn-origin",
    moduleId: "./modules/weaving/master-yarn-origin/index",
    nav: true,
    title: "Master Asal Benang",
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
    route: "weaving/master-machine-type",
    name: "master-machine-type",
    moduleId: "./modules/weaving/master-machine-type/index",
    nav: true,
    title: "Master Tipe Mesin",
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
  },
  {
    route: "weaving/machine-planning",
    name: "machine-planning",
    moduleId: "./modules/weaving/machine-planning/index",
    nav: true,
    title: "Perencanaan Mesin",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/daily-operational-machine-input",
    name: "daily-operational-machine-input",
    moduleId: "./modules/weaving/daily-operational-machine-input/index",
    nav: true,
    title: "Input Mesin Operasional Harian",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/production-results",
    name: "production-results",
    moduleId: "./modules/weaving/production-results/index",
    nav: true,
    title: "Input Hasil Produksi",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  }
];
