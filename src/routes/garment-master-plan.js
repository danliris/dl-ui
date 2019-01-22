module.exports = [
    {
        route: '/garment-master-plan/standard-minute-value',
        name: 'standard-hour',
        moduleId: './modules/garment-master-plan/standard-hour/index',
        nav: true,
        title: 'Standard Minute Value',
        auth: true,
        settings: {
            group: "g-master-plan",
            //permission: { "IE": 1,"C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-master-plan/standard-minute-value-list',
        name: 'standard-hour',
        moduleId: './modules/garment-master-plan/standard-hour-list/index',
        nav: true,
        title: 'Standard Minute Value',
        auth: true,
        settings: {
            group: "g-master-plan",
            //permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-master-plan/garment-section',
        name: 'garment-section',
        moduleId: './modules/garment-master-plan/garment-section/index',
        nav: true,
        title: 'Master Seksi',
        auth: true,
        settings: {
            group: "g-master-plan",
            //permission: { "PGA": 1, "IE": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-master-plan/master-plan-comodity',
        name: 'master-plan-comodity',
        moduleId: './modules/garment-master-plan/master-plan-comodity/index',
        nav: true,
        title: 'Komoditi',
        auth: true,
        settings: {
            group: "g-master-plan",
            //permission: { "PGA": 1, "IE": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-master-plan/master-plan-comodity-list',
        name: 'master-plan-comodity',
        moduleId: './modules/garment-master-plan/master-plan-comodity-list/index',
        nav: true,
        title: 'Komoditi',
        auth: true,
        settings: {
            group: "g-master-plan",
            //permission: { "C5": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    // {
    //     route: '/garment-master-plan/working-hours-standard',
    //     name: 'working-hours-standard',
    //     moduleId: './modules/garment-master-plan/working-hours-standard/index',
    //     nav: true,
    //     title: 'Standar Jam Kerja',
    //     auth: true,
    //     settings: {
    //         group: "g-master-plan",
    //         permission: { "C5": 1, "C9": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     }
    // },
    // {
    //     route: '/garment-master-plan/style',
    //     name: 'style',
    //     moduleId: './modules/garment-master-plan/style/index',
    //     nav: true,
    //     title: 'Master Style',
    //     auth: true,
    //     settings: {
    //         group: "g-master-plan",
    //         permission: { "C5": 1, "C9": 1 },
    //         iconClass: 'fa fa-dashboard'
    //     }
    // },
    {
        route: '/garment-master-plan/booking-order',
        name: 'booking-order',
        moduleId: './modules/garment-master-plan/booking-order/index',
        nav: true,
        title: 'Booking Order',
        auth: true,
        settings: {
            group: "g-master-plan",
            //permission: { "PGA": 1, "B7": 1,"C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-master-plan/monitoring-booking-order',
        name: 'monitoring-booking-order',
        moduleId: './modules/garment-master-plan/monitoring-booking-order/index',
        nav: true,
        title: 'Monitoring Booking Order',
        auth: true,
        settings: {
            group: "g-master-plan",
            //permission: { "PGA": 1, "B7": 1, "IE": 1,"C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: '/garment-master-plan/weekly-plan',
        name: 'weekly-plan',
        moduleId: './modules/garment-master-plan/weekly-plan/index',
        nav: true,
        title: 'Master Minggu',
        auth: true,
        settings: {
            group: "g-master-plan",
            //permission: { "B7": 1,"C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    { 
        route: '/garment-master-plan/sewing-blocking-plan',
        name: 'sewing-blocking-plan',
        moduleId: './modules/garment-master-plan/sewing-blocking-plan/index',
        nav: true,
        title: 'Blocking Plan Sewing',
        auth: true,
        settings: {
            group: "g-master-plan",
            //permission: { "B7": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },
    {
      route: '/garment-master-plan/monitoring-remaining-eh',
      name: 'monitoring-remaining-eh',
      moduleId: './modules/garment-master-plan/monitoring-remaining-eh/index',
      nav: true,
      title: 'Monitoring Remaining EH',
      auth: true,
      settings: {
          group: "g-master-plan",
          //permission: { "PGA": 1, "B7": 1, "IE": 1,"C9": 1 },
          iconClass: 'fa fa-dashboard'
      }
  },
  {
      route: '/garment-master-plan/monitoring-master-plan',
      name: 'monitoring-master-plan',
      moduleId: './modules/garment-master-plan/monitoring-master-plan/index',
      nav: true,
      title: 'Report Master Plan',
      auth: true,
      settings: {
          group: "g-master-plan",
          //permission: { "PGA": 1, "B7": 1,"C9": 1 },
          iconClass: 'fa fa-dashboard'
      }
  },

    {
        route: '/garment-master-plan/accepted-order-monitoring',
        name: 'accepted-order-monitoring',
        moduleId: './modules/garment-master-plan/accepted-order-monitoring/index',
        nav: true,
        title: 'Monitoring Order Diterima dan Booking',
        auth: true,
        settings: {
            group: "g-master-plan",
            //permission: { "PGA": 1,"B7": 1,"IE": 1,"C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    },

    {
        route: '/garment-master-plan/booking-orders-canceled-monitoring',
        name: 'booking-orders-canceled-monitoring',
        moduleId: './modules/garment-master-plan/monitoring-canceled-booking-order/index',
        nav: true,
        title: 'Monitoring Canceled Booking Order',
        auth: true,
        settings: {
            group: "g-master-plan",
            //permission: { "PGA": 1,"B7": 1, "IE": 1, "C9": 1 },
            iconClass: 'fa fa-dashboard'
        }
    }

]
