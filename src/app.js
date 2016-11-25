import {Aurelia, inject} from 'aurelia-framework';
import {Session} from './utils/session';

@inject(Session)
export class App {
  constructor(session) {
    this.session = session;

    this.toggleMinimizeSideMenu = false;
    this.activeMenu = [];
    this.activeSubMenu = {};
  }

  configureRouter(config, router) {
    config.title = ''; 
    var routes = [ 
      { route: ['', 'Welcome'],                       name: 'welcome',                                  moduleId: './welcome',                                                                nav: false, title: 'Home' }, 
      { route: 'buyers',                              name: 'buyers',                                   moduleId: './modules/master/buyer/index',                                             nav: true,  title: 'Buyer',                       settings: { group:"master",       roles:["admin"], iconClass:'fa fa-dashboard' }},
      { route: 'suppliers',                           name: 'suppliers',                                moduleId: './modules/master/supplier/index',                                          nav: true,  title: 'Supplier',                    settings: { group:"master",       roles:["admin"], iconClass:'fa fa-dashboard' }},
      { route: 'uoms',                                name: 'uoms',                                     moduleId: './modules/master/uom/index',                                               nav: true,  title: 'Satuan',                      settings: { group:"master",       roles:["admin"], iconClass:'fa fa-dashboard' }},
      { route: 'products',                            name: 'products',                                 moduleId: './modules/master/product/index',                                           nav: true,  title: 'Barang',                      settings: { group:"master",       roles:["admin"], iconClass:'fa fa-dashboard' }},
      { route: 'pr',                                  name: 'purchase-request',                         moduleId: './modules/purchasing/purchase-request/index',                              nav: true,  title: 'Purchase Request',            settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'pr/monitoring',                       name: 'purchase-request-monitoring',              moduleId: './modules/purchasing/monitoring-purchase-request/index',                   nav: true,  title: 'Monitoring Purchase Request', settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'po',                                  name: 'purchase-order',                           moduleId: './modules/purchasing/purchase-order/index',                                nav: true,  title: 'Purchase Order',              settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'po-external',                         name: 'purchase-order-external',                  moduleId: './modules/purchasing/purchase-order-external/index',                       nav: true,  title: 'Purchase Order External',     settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'po/monitoring',                       name: 'purchase-order-monitoring',                moduleId: './modules/purchasing/monitoring-purchase-order/index',                     nav: true,  title: 'Monitoring Purchase',         settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'po/reports/periode/unit',             name: 'purchase-order-reports-periode-unit',      moduleId: './modules/purchasing/reports/purchase-order-report/unit-report/index',     nav: true,  title: 'Laporan Total Pembelian per Unit',    settings: { group:"purchasing", roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'po/reports/periode/category',         name: 'purchase-order-reports-periode-category',  moduleId: './modules/purchasing/reports/purchase-order-report/category-report/index', nav: true,  title: 'Laporan Total Pembelian per Kategori', settings: { group:"purchasing", roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'do',                                  name: 'delivery-order',                           moduleId: './modules/purchasing/delivery-order/index',                                nav: true,  title: 'Surat Jalan',                 settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'do/monitoring',                       name: 'delivery-order-monitoring',                moduleId: './modules/purchasing/monitoring-delivery-order/index',                     nav: true,  title: 'Monitoring Surat Jalan',      settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'receipt-note/unit',                   name: 'receipt-note-unit',                        moduleId: './modules/purchasing/unit-receipt-note/index',                             nav: true,  title: 'Bon Terima Unit',             settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'receipt-note/unit/monitoring',        name: 'receipt-note-unit-monitoring',             moduleId: './modules/purchasing/unit-receipt-note-monitoring/index',                  nav: true,  title: 'Monitoring Bon Terima Unit',  settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'unit-payment-order',                  name: 'unit-payment-order',                       moduleId: './modules/purchasing/unit-payment-order/index',                            nav: true,  title: 'Surat Perintah Bayar',        settings: { group: "purchasing",  roles: ["purchasing"], iconClass:'fa fa-dashboard' } },
      { route: 'unit-payment-note/price-correction',  name: 'unit-payment-price-correction-note',       moduleId: './modules/purchasing/unit-payment-price-correction-note/index',            nav: true,  title: 'Koreksi Harga Pembelian',     settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'production/spinning/winding/winding-production-output',           name: 'winding-production-output',                moduleId: './modules/production/spinning/winding/winding-production-output/index',    nav: true,  title: 'Output Hasil Produksi Spinning',settings: { group:"purchasing",   roles:["purchasing"], iconClass:'fa fa-dashboard'  }},
      { route: 'production/spinning/winding/winding-quality-sampling',       name: 'winding-quality-sampling',      moduleId: './modules/production/spinning/winding/winding-quality-sampling/index',                 nav: true, title: 'Quality Hasil Produksi Spinning', settings: { group:"purchasing", roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      { route: 'production/spinning/winding/reports/winding-quality-sampling-report',       name: 'winding-quality-sampling-report',      moduleId: './modules/production/spinning/winding/reports/winding-quality-sampling-report/index',                 nav: true, title: 'Laporan Quality Hasil Produksi Spinning', settings: { group:"purchasing", roles:["purchasing"], iconClass:'fa fa-dashboard' }},
      
      { route: 'power-bi',                            name: 'power-bi',           moduleId: './modules/power-bi/index',               nav: true, title: 'Power BI Reports' ,                                                settings: { group:"reports", roles:["admin"], iconClass:'fa fa-dashboard' }}
    ];

    if (!this.session.isAuthenticated)
      routes = [
        { route: ['', 'login'], name: 'login', moduleId: './login', nav: false, title: 'login' }
      ]
    else {
      routes = routes.filter(route => {
        if (route.settings && route.settings.roles)
          return route.settings.roles.find(role => {
            return this.session.roles.indexOf(role) != -1;
          }) != undefined;
        else
          return true;
      });
    }

    config.map(routes);
    this.router = router;
  }
}

