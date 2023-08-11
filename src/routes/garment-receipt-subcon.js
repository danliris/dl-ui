module.exports = [
  //Transaksi
  {
    route: "/garment-receipt-subcon/delivery-order-subcon",
    name: "delivery-order-subcon",
    moduleId: "./modules/garment-receipt-subcon/delivery-order-subcon/index",
    nav: true,
    title: "Surat Jalan Subcon",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "transaksi",
      permission: { X1: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/unit-receipt-note-by-user",
    name: "unit-receipt-note",
    moduleId:
      "./modules/garment-receipt-subcon/unit-receipt-note-by-user/index",
    nav: true,
    title: "Bon Terima Unit",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "transaksi",
      permission: { X2: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/unit-receipt-note-all",
    name: "unit-receipt-note",
    moduleId: "./modules/garment-receipt-subcon/unit-receipt-note-all/index",
    nav: true,
    title: "Bon Terima Unit (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "transaksi",
      permission: { X3: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/unit-delivery-order-by-user",
    name: "unit-receipt-note-by-user",
    moduleId:
      "./modules/garment-receipt-subcon/unit-delivery-order-by-user/index",
    nav: true,
    title: "Unit Delivery Order",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "transaksi",
      permission: { X4: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/unit-delivery-order-all",
    name: "unit-receipt-note-all",
    moduleId: "./modules/garment-receipt-subcon/unit-delivery-order-all/index",
    nav: true,
    title: "Unit Delivery Order (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "transaksi",
      permission: { X5: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/unit-expenditure-note-by-user",
    name: "unit-expenditure-note-by-user",
    moduleId:
      "./modules/garment-receipt-subcon/unit-expenditure-note-by-user/index",
    nav: true,
    title: "Bon Pengeluaran Unit",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "transaksi",
      permission: { X6: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  //Production
  {
    route: "/garment-receipt-subcon/preparing",
    name: "garment-receipt-subcon-preparing",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/preparing/index",
    nav: true,
    title: "Preparing",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X7: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/preparing-alluser",
    name: "garment-receipt-subcon-preparing-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/preparing_alluser/index",
    nav: true,
    title: "Preparing - Semua User",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X8: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/cutting-in",
    name: "garment-receipt-subcon-cutting-in",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/cutting-in/index",
    nav: true,
    title: "Cutting-In",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X9: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/cutting-in-alluser",
    name: "garment-receipt-subcon-cutting-in-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/cutting-in-alluser/index",
    nav: true,
    title: "Cutting-In (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X10: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/cutting-out",
    name: "garment-receipt-subcon-cutting-out",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/cutting-out/index",
    nav: true,
    title: "Cutting-Out",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X11: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/cutting-out-alluser",
    name: "garment-receipt-subcon-cutting-out-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/cutting-out-alluser/index",
    nav: true,
    title: "Cutting-Out (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X12: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/loading-in",
    name: "garment-receipt-subcon-loading-in",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/loading-in/index",
    nav: true,
    title: "Loading In",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X13: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/loading-in-alluser",
    name: "garment-receipt-subcon-loading-in-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/loading-in-alluser/index",
    nav: true,
    title: "Loading In (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X14: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/loading-out",
    name: "garment-receipt-subcon-loading-out",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/loading-out/index",
    nav: true,
    title: "Loading Out",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X16: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/loading-out-alluser",
    name: "garment-receipt-subcon-loading-out-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/loading-out-alluser/index",
    nav: true,
    title: "Loading Out (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X17: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/sewing-in",
    name: "garment-receipt-subcon-sewing-in",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/sewing-in/index",
    nav: true,
    title: "Sewing In",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X18: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/sewing-in-alluser",
    name: "garment-receipt-subcon-sewing-in-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/sewing-in-alluser/index",
    nav: true,
    title: "Sewing In (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X20: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/sewing-out",
    name: "garment-receipt-subcon-sewing-out",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/sewing-out/index",
    nav: true,
    title: "Sewing Out",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X20: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/sewing-out-alluser",
    name: "garment-receipt-subcon-sewing-out-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/sewing-out-alluser/index",
    nav: true,
    title: "Sewing Out (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X20: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
];
