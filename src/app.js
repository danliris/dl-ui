import {Aurelia, inject} from 'aurelia-framework';
import {Session} from './utils/session';

@inject(Session)
export class App {
  constructor(session) {
    this.session = session;
  }

  configureRouter(config, router) { 
    config.title = '';
    var routes = [
      { route: ['', 'Welcome'], name: 'welcome', moduleId: './welcome', nav: false, title: '' }, 
      { route: 'buyers',              name: 'buyers',                         moduleId: './modules/master/buyer/index',                             nav: true, title: 'Buyer', settings: { group:"master", roles:["admin"] }},
      { route: 'suppliers',           name: 'suppliers',                      moduleId: './modules/master/supplier/index',                          nav: true, title: 'Supplier', settings: { group:"master", roles:["admin"] }},
      { route: 'uoms',                name: 'uoms',                           moduleId: './modules/master/uom/index',                               nav: true, title: 'Satuan', settings: { group:"master", roles:["admin"] }},
      { route: 'products',            name: 'products',                       moduleId: './modules/master/product/index',                           nav: true, title: 'Barang', settings: { group:"master", roles:["admin"] }},
      { route: 'po',                  name: 'purchase-order',                 moduleId: './modules/purchasing/purchase-order/index',                nav: true, title: 'Purchase Order', settings: { group:"purchasing", roles:["purchasing"] }},
      { route: 'po/monitoring',       name: 'purchase-order-monitoring',      moduleId: './modules/purchasing/monitoring-purchase-order/index',           nav: true, title: 'Monitoring Purchase', settings: { group:"purchasing", roles:["purchasing"] }},
      { route: 'po-external',         name: 'purchase-order-external',        moduleId: './modules/purchasing/purchase-order-external/index',       nav: true, title: 'Purchase Order External', settings: { group:"purchasing", roles:["purchasing"] }},
      { route: 'po/reports/periode',  name: 'purchase-order-reports-periode', moduleId: './modules/purchasing/reports/purchase-order-report/index', nav: true, title: 'Rekap Total Pembelian per Unit per Periode', settings: { group:"purchasing", roles:["purchasing"] }},
      { route: 'do',                  name: 'delivery-order',                 moduleId: './modules/purchasing/delivery-order/index',                nav: true, title: 'Surat Jalan', settings: { group:"purchasing", roles:["purchasing"] }},
      { route: 'do/monitoring',       name: 'delivery-order-monitoring',      moduleId: './modules/purchasing/monitoring-delivery-order/index',        nav: true, title: 'Monitoring Surat Jalan', settings: { group:"purchasing", roles:["purchasing"] }}
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

