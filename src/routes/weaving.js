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
    route: "weaving/shift",
    name: "weaving-shift",
    moduleId: "./modules/weaving/master-shift/index",
    nav: true,
    title: "Master Shift",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/master-beam",
    name: "weaving-master-beam",
    moduleId: "./modules/weaving/master-beam/index",
    nav: true,
    title: "Master Beam",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/master-defect",
    name: "master-defect",
    moduleId: "./modules/weaving/master-defect/index",
    nav: true,
    title: "Master Cacat Kain",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/master-operator",
    name: "master-operator",
    moduleId: "./modules/weaving/master-operator/index",
    nav: true,
    title: "Master Operator",
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
    route: "weaving/beam-monitoring",
    name: "beam-monitoring",
    moduleId: "./modules/weaving/beam-monitoring/index",
    nav: true,
    title: "Pemantauan Beam",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/daily-operation-warping",
    name: "daily-operation-warping",
    moduleId: "./modules/weaving/daily-operation-warping/index",
    nav: true,
    title: "Operasional Mesin Harian Warping",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/daily-operation-sizing",
    name: "daily-operation-sizing",
    moduleId: "./modules/weaving/daily-operation-sizing/index",
    nav: true,
    title: "Operasional Mesin Harian Sizing",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/size-pickup-report",
    name: "size-pickup-report",
    moduleId: "./modules/weaving/size-pickup-report/index",
    nav: true,
    title: "Laporan Size Pickup",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/daily-operation-loom",
    name: "weaving-daily-operation-loom",
    moduleId: "./modules/weaving/daily-operation-loom/index",
    nav: true,
    title: "Operasional Mesin Harian Loom",
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
    title: "Hasil Produksi",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/weaving-efficiency-report",
    name: "weaving-efficiency-report",
    moduleId: "./modules/weaving/weaving-efficiency-report/index",
    nav: true,
    title: "Laporan Efisiensi Weaving",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
  {
    route: "weaving/daily-operation-reaching-tying",
    name: "weaving-daily-operation-reaching-tying",
    moduleId: "./modules/weaving/daily-operation-reaching-tying/index",
    nav: true,
    title: "Operasional Mesin Harian Reaching/ Tying",
    auth: true,
    settings: {
      group: "weaving",
      permission: { W1: 1, W2: 1, "*": 1 },
      iconClass: "fa fa-dashboard"
    }
  },
];
