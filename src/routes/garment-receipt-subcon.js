module.exports = [
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
];
