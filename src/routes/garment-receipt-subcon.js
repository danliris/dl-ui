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
      permission: { H61: 1 },
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
      permission: { H12: 1 },
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
      permission: { H12: 1 },
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
      permission: { H16: 1 },
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
      permission: { H16: 1 },
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
      // permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
      permission: { H19: 1 },
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
      // permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
      permission: { H19: 1 },
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
      // permission: { "C9": 1, "C1B": 1, "C1A": 1, "C2C": 1, "C2B": 1, "C2A": 1 },
      permission: { H19: 1 },
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
      // permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
      permission: { O7: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
  {
    route: "/garment-production/cutting-in-alluser",
    name: "garment-production-cutting-in-alluser",
    moduleId:
      "./modules/garment-receipt-subcon/garment-production/cutting-in-alluser/index",
    nav: true,
    title: "Cutting-In (Semua User)",
    auth: true,
    settings: {
      group: "g-receipt-subcon",
      subGroup: "produksi",
      // permission: { "C9": 1, "C1A": 1, "C1B": 1, "C2A": 1, "C2B": 1, "C2C": 1, "P": 1 },
      permission: { O22: 1 },
      iconClass: "fa fa-dashboard",
    },
  },
];
