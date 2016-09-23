export class App {
  configureRouter(config, router) {
    config.title = '';
    config.map([
      { route: ['', 'Welcome'], name: 'welcome', moduleId: './welcome', nav: false, title: '' },
      // { route: 'users',         name: 'users',        moduleId: './users',        nav: true, title: 'Github Users' },
      // { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
      // { route: 'products',      name: 'products',     moduleId: './modules/product/index',        nav: true, title: 'Products' },

      { route: 'buyers', name: 'buyers', moduleId: './modules/master/buyer/index', nav: true, title: 'Buyer' },
      { route: 'suppliers', name: 'suppliers', moduleId: './modules/master/supplier/index', nav: true, title: 'Supplier' },
      { route: 'uoms', name: 'uoms', moduleId: './modules/master/uom/index', nav: true, title: 'Satuan' },
      { route: 'products', name: 'products', moduleId: './modules/master/product/index', nav: true, title: 'Barang' },
      { route: 'po', name: 'purchase-order', moduleId: './modules/purchasing/purchase-order/index', nav: true, title: 'Purchase Order' },
      { route: 'po-external', name: 'purchase-order-external', moduleId: './modules/purchasing/purchase-order-external/index', nav: true, title: 'Purchase Order External' },
      { route: 'do', name: 'delivery-order', moduleId: './modules/purchasing/delivery-order/index', nav: true, title: 'Delivery Order' },
      { route: 'monitoringpurchase', name: 'monitoringpurchase', moduleId: './modules/po/monitoring-purchase/index', nav: true, title: 'Monitoring Purchase' },
      { route: 'monitoringsuratjalan', name: 'monitoringsuratjalan', moduleId: './modules/po/monitoring-surat-jalan/index', nav: true, title: 'Monitoring Surat Jalan' },
     // { route: 'costcalculations', name: 'costcalculations', moduleId: './components/cost-calculation/index', nav: true, title: 'Cost Calculation' },
      { route: 'poreportsperperiode', name: 'poreportsperperiode', moduleId: './modules/purchasing/reports/purchase-order-report/index', nav: true, title: 'Rekap Total Pembelian per Unit per Periode' }

    ]);

    this.router = router;
  }
}

