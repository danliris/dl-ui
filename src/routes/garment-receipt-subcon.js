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
  {
    route: "/garment-receipt-subcon/unit-expenditure-note-all-user",
    name: "unit-expenditure-note-all-user",
    moduleId:
      "./modules/garment-receipt-subcon/unit-expenditure-note-all/index",
    nav: true,
    title: "Bon Pengeluaran Unit (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "transaksi",
      permission: { X38: 1 },
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
      permission: { X21: 1 },
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
      permission: { X22: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/finishing-in",
    name: "garment-receipt-subcon-finishing-in",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/finishing-in/index",
    nav: true,
    title: "Finishing In",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X23: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/finishing-in-alluser",
    name: "garment-receipt-subcon-finishing-in-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/finishing-in-alluser/index",
    nav: true,
    title: "Finishing In (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X25: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/finishing-out",
    name: "garment-receipt-subcon-finishing-out",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/finishing-out/index",
    nav: true,
    title: "Finishing Out",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X26: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/finishing-out-alluser",
    name: "garment-receipt-subcon-finishing-out-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/finishing-out-alluser/index",
    nav: true,
    title: "Finishing Out (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X27: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/packing-in",
    name: "garment-receipt-subcon-packing-in",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/packing-in/index",
    nav: true,
    title: "Packing In",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X28: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/packing-in-alluser",
    name: "garment-receipt-subcon-packing-in-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/packing-in-alluser/index",
    nav: true,
    title: "Packing In (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X30: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/packing-out",
    name: "garment-receipt-subcon-packing-out",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/packing-out/index",
    nav: true,
    title: "Packing Out",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X31: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/packing-out-alluser",
    name: "garment-receipt-subcon-packing-out-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/packing-out-alluser/index",
    nav: true,
    title: "Packing Out (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      permission: { X32: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/packing-list",
    name: "garment-receipt-subcon-packing-list",
    moduleId:
      "./modules/garment-receipt-subcon/garment-shipping/packing-list-items/index",
    nav: true,
    title: "Packing List",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "shipping",
      permission: { X33: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/packing-list-alluser",
    name: "garment-receipt-subcon-packing-list-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-shipping/packing-list-items-alluser/index",
    nav: true,
    title: "Packing List (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "shipping",
      permission: { X35: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/omzet-by-unit-report",
    name: "garment-receipt-subcon-omzet-by-unit-report",
    moduleId:
      "./modules/garment-receipt-subcon/garment-shipping/garment-receipt-subcon-omzet-by-unit-report/index",
    nav: true,
    title: "Monitoring Omzet Terima Subcon Per Unit",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "monittoring",
      permission: { X36: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-receipt-subcon/local-sales-note",
    name: "garment-receipt-subcon-local-sales-note",
    moduleId:
      "./modules/garment-receipt-subcon/garment-shipping/local-sales-note/index",
    nav: true,
    title: "Nota Jual Lokal - Terima Subcon",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "shipping",
      permission: { X37: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
];
