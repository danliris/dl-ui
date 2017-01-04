module.exports = [ 
    {
        route: 'po',
        name: 'purchase-order',
        moduleId: './modules/purchasing/purchase-order/index',
        nav: true,
        title: 'Purchase Order',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["purchasing"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po-external',
        name: 'purchase-order-external',
        moduleId: './modules/purchasing/purchase-order-external/index',
        nav: true,
        title: 'Purchase Order External',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["purchasing"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/monitoring',
        name: 'purchase-order-monitoring',
        moduleId: './modules/purchasing/monitoring-purchase-order/index',
        nav: true,
        title: 'Monitoring Purchase',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["purchasing"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/periode/unit',
        name: 'purchase-order-reports-periode-unit',
        moduleId: './modules/purchasing/reports/purchase-order-report/unit-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Unit',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["purchasing"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/periode/category',
        name: 'purchase-order-reports-periode-category',
        moduleId: './modules/purchasing/reports/purchase-order-report/category-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Kategori',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["purchasing"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'po/reports/periode/unit-category',
        name: 'purchase-order-reports-periode-unit-category',
        moduleId: './modules/purchasing/reports/purchase-order-report/unit-category-report/index',
        nav: true,
        title: 'Laporan Total Pembelian per Unit per Kategori',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["purchasing"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'do',
        name: 'delivery-order',
        moduleId: './modules/purchasing/delivery-order/index',
        nav: true,
        title: 'Surat Jalan',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["purchasing"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'do/monitoring',
        name: 'delivery-order-monitoring',
        moduleId: './modules/purchasing/monitoring-delivery-order/index',
        nav: true,
        title: 'Monitoring Surat Jalan',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["purchasing"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-order',
        name: 'unit-payment-order',
        moduleId: './modules/purchasing/unit-payment-order/index',
        nav: true,
        title: 'Surat Perintah Bayar',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["purchasing"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-note/price-correction',
        name: 'unit-payment-price-correction-note',
        moduleId: './modules/purchasing/unit-payment-price-correction-note/index',
        nav: true,
        title: 'Koreksi Harga Pembelian',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["purchasing"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'unit-payment-note/quantity-correction',
        name: 'unit-payment-quantity-correction-note',
        moduleId: './modules/purchasing/unit-payment-quantity-correction-note/index',
        nav: true,
        title: 'Koreksi Jumlah Pembelian',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["purchasing"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'purchase-request-by-role',
        name: 'purchase-request-by-role',
        moduleId: './modules/purchasing/purchase-request-by-role/index',
        nav: true,
        title: 'Purchase Request By Purcashing Unit',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["*"],
            iconClass: 'fa fa-dashboard'
        }
    },
    {
        route: 'monitoring-purchase-request-all-unit',
        name: 'monitoring-purchase-request-all-unit',
        moduleId: './modules/purchasing/monitoring-purchase-request-all-unit/index',
        nav: true,
        title: 'Monitoring Purchase Request Semua Unit',
        auth: true,
        settings: {
            group: "purchasing",
            roles: ["*"],
            iconClass: 'fa fa-dashboard'
        }
    }]