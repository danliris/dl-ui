export class App {
  configureRouter(config, router) {
    config.title = '';
    config.map([
      { route: ['', 'Welcome'], name: 'welcome', moduleId: './welcome', nav: false, title: '' },
      // { route: 'users',         name: 'users',        moduleId: './users',        nav: true, title: 'Github Users' },
      // { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
      // { route: 'products',      name: 'products',     moduleId: './components/product/index',        nav: true, title: 'Products' },

      { route: 'buyers', name: 'buyers', moduleId: './components/buyer/index', nav: true, title: 'Buyer' },
      { route: 'suppliers', name: 'suppliers', moduleId: './components/supplier/index', nav: true, title: 'Supplier' },
      { route: 'uoms', name: 'uoms', moduleId: './components/UoM/index', nav: true, title: 'Satuan' },
      { route: 'fabrics', name: 'fabrics', moduleId: './components/fabric/index', nav: true, title: 'Fabric' },
      { route: 'textiles', name: 'textiles', moduleId: './components/textile/index', nav: true, title: 'Tekstil' },
      { route: 'accessories', name: 'accessories', moduleId: './components/accessories/index', nav: true, title: 'Aksesoris' },
      { route: 'spareparts', name: 'spareparts', moduleId: './components/sparepart/index', nav: true, title: 'Sparepart' },
      { route: 'generalmerchandises', name: 'generalmerchandises', moduleId: './components/general-merchandise/index', nav: true, title: 'Barang Umum' },
      { route: 'pogarmentfabrics', name: 'pogarmentfabrics', moduleId: './components/po/po-garment-fabric/index', nav: true, title: 'PO Garment : Master Fabric' },
      { route: 'pogarmentgenerals', name: 'pogarmentgenerals', moduleId: './components/po/po-garment-general/index', nav: true, title: 'PO Garment : Barang Umum' },
      { route: 'garmentspareparts', name: 'garmentspareparts', moduleId: './components/po/po-garment-sparepart/index', nav: true, title: 'PO Garment : Sparepart' },
      { route: 'textileexternals', name: 'textileexternals', moduleId: './components/po/po-textile-job-order-external/index', nav: true, title: 'PO Tekstil : Job Order/Eksternal' },
      { route: 'textilegeneralatk', name: 'textile-general-atk', moduleId: './components/po/po-textile-general-atk/index', nav: true, title: 'PO Tekstil : Umum ATK & Kebersihan' }

    ]);

    this.router = router;
  }
}
