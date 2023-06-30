module.exports = [
  {
    route: "/garment/delivery-order-subcon",
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
    route: "/garment/unit-receipt-note-by-user",
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
];
