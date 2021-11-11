module.exports = [
    {
        route: '/garment-subcon/subcon-contract',
        name: 'subcon-contract',
        moduleId: './modules/garment-subcon/garment-subcon-contract/index',
        nav: true,
        title: 'Subcon Contract',
        auth: true,
        settings: {
            group: "g-subcon",
            subGroup: "kontrak",
            permission: { "E": 1, "K": 1, "C9": 1,  "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1,  "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-subcon/service-subcon-cutting',
        name: 'service-subcon-cutting',
        moduleId: './modules/garment-subcon/garment-service-subcon-cutting/index',
        nav: true,
        title: 'Subcon Jasa - Komponen',
        auth: true,
        settings: {
            group: "g-subcon",
            subGroup: "packing list subcon",
            permission: { "E": 1, "K": 1, "C9": 1,  "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1,  "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
      route: '/garment-subcon/service-subcon-sewing',
      name: 'subcon-sewing',
      moduleId: './modules/garment-subcon/garment-service-subcon-sewing/index',
      nav: true,
      title: 'Subcon Jasa - Garment Wash',
      auth: true,
      settings: {
        group: "g-subcon",
        subGroup: "packing list subcon",
        permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
        iconClass: 'fa fa-dashboard'
      }
    },
  {
    route: '/garment-subcon/subcon-contract',
    name: 'subcon-contract',
    moduleId: './modules/garment-subcon/garment-subcon-contract/index',
    nav: true,
    title: 'Subcon Contract',
    auth: true,
    settings: {
      group: "g-subcon",
      subGroup: "kontrak",
      permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-subcon/service-subcon-cutting',
    name: 'service-subcon-cutting',
    moduleId: './modules/garment-subcon/garment-service-subcon-cutting/index',
    nav: true,
    title: 'Subcon Jasa - Shrinkage / Panel',
    auth: true,
    settings: {
      group: "g-subcon",
      subGroup: "packing list subcon",
      permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    } 
  },
  {
    route: '/garment-subcon/service-subcon-shrinkage-panel',
    name: 'service-subcon-shrinkage-panel',
    moduleId: './modules/garment-subcon/garment-service-subcon-shrinkage-panel/index',
    nav: true,
    title: 'Subcon Jasa - Shrinkage / Panel',
    auth: true,
    settings: {
      group: "g-subcon",
      subGroup: "packing list subcon",
      permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-subcon/fabric-wash',
    name: 'subcon-fabric-wash',
    moduleId: './modules/garment-subcon/garment-service-fabric-wash/index',
    nav: true,
    title: 'Subcon Jasa - Fabric Wash/Print',
    auth: true,
    settings: {
      group: "g-subcon",
      subGroup: "packing list subcon",
      permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-subcon/subcon-delivery-letter-out',
    name: 'subcon-sewing',
    moduleId: './modules/garment-subcon/garment-subcon-delivery-letter-out/index',
    nav: true,
    title: 'Surat Jalan Subcon - Keluar',
    auth: true,
    settings: {
      group: "g-subcon",
      subGroup: "surat jalan subcon",
      permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-subcon/subcon-customs-in',
    name: 'subcon-customs-in',
    moduleId: './modules/garment-subcon/garment-subcon-customs-in/index',
    nav: true,
    title: 'BC Masuk',
    auth: true,
    settings: {
      group: "g-subcon",
      subGroup: "bc subcon",
      permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
  {
    route: '/garment-subcon/subcon-customs-out',
    name: 'subcon-sewing',
    moduleId: './modules/garment-subcon/customs-out/index',
    nav: true,
    title: 'BC Keluar',
    auth: true,
    settings: {
      group: "g-subcon",
      subGroup: "bc subcon",
      permission: { "E": 1, "K": 1, "C9": 1, "B9": 1, "C5": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "P": 1, "FC": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1 },
      iconClass: 'fa fa-dashboard'
    }
  },
]

