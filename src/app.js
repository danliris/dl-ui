export class App {
  configureRouter(config, router) {
    config.title = '';
    config.map([
      { route: ['', 'Welcome'], name: 'welcome', moduleId: './welcome', nav: false, title: '' },
      // { route: 'users',         name: 'users',        moduleId: './users',        nav: true, title: 'Github Users' },
      // { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
      // { route: 'products',      name: 'products',     moduleId: './modules/product/index',        nav: true, title: 'Products' },

      { route: 'buyers', name: 'buyers', moduleId: './modules/buyer/index', nav: true, title: 'Buyer' },
      { route: 'suppliers', name: 'suppliers', moduleId: './modules/supplier/index', nav: true, title: 'Supplier' },
      { route: 'uoms', name: 'uoms', moduleId: './modules/uom/index', nav: true, title: 'Satuan' },
      { route: 'fabrics', name: 'fabrics', moduleId: './modules/fabric/index', nav: true, title: 'Fabric' },
      { route: 'textiles', name: 'textiles', moduleId: './modules/textile/index', nav: true, title: 'Tekstil' },
      { route: 'accessories', name: 'accessories', moduleId: './modules/accessories/index', nav: true, title: 'Aksesoris' },
      { route: 'spareparts', name: 'spareparts', moduleId: './modules/sparepart/index', nav: true, title: 'Sparepart' },
      { route: 'generalmerchandises', name: 'generalmerchandises', moduleId: './modules/general-merchandise/index', nav: true, title: 'Barang Umum' },
      // { route: 'pogarmentfabrics', name: 'pogarmentfabrics', moduleId: './modules/po/po-garment-fabric/index', nav: true, title: 'PO Garment : Master Fabric' },
      // { route: 'garmentaccessories', name: 'garmentaccessories', moduleId: './modules/po/po-garment-accessories/index', nav: true, title: 'PO Garment : Master Accessories' }, 
      { route: 'pogarmentgenerals', name: 'pogarmentgenerals', moduleId: './modules/po/po-garment-general/index', nav: true, title: 'PO Garment : Barang Umum' },
      // { route: 'garmentspareparts', name: 'garmentspareparts', moduleId: './modules/po/po-garment-sparepart/index', nav: true, title: 'PO Garment : Sparepart' },
      { route: 'garmentjoborderfabrics', name: 'garmentjoborderfabrics', moduleId: './modules/po/po-garment-job-order-fabric/index', nav: true, title: 'PO Garment : Job Order Fabric' },
      { route: 'garmentjoborderaccessories', name: 'garmentjoborderaccessories', moduleId: './modules/po/po-garment-job-order-accessories/index', nav: true, title: 'PO Garment : Job Order Accessories' },
      // { route: 'textileexternals', name: 'textileexternals', moduleId: './modules/po/po-textile-job-order-external/index', nav: true, title: 'PO Tekstil : Job Order/Eksternal' },
      // { route: 'textilegeneralatk', name: 'textile-general-atk', moduleId: './modules/po/po-textile-general-atk/index', nav: true, title: 'PO Tekstil : Umum ATK & Kebersihan' },
      // { route: 'textilegeneralotheratk', name: 'textile-general-other-atk', moduleId: './modules/po/po-textile-general-other-atk/index', nav: true, title: 'PO Tekstil : Umum Selain ATK & Kebersihan' },
      // { route: 'textilespareparts', name: 'textilespareparts', moduleId: './modules/po/po-textile-sparepart/index', nav: true, title: 'PO Tekstil : Sparepart' },
      { route: 'potextiles', name: 'potextiles', moduleId: './modules/po/po-textile/index', nav: true, title: 'PO Tekstil' },
      { route: 'suratjalan', name: 'suratjalan', moduleId: './modules/surat-jalan/index', nav: true, title: 'Surat Jalan Tekstil' },
      //{ route: 'costcalculations', name: 'costcalculations', moduleId: './components/cost-calculation/index', nav: true, title: 'Cost Calculation' },
      { route: 'poperperiode', name: 'poperperiode', moduleId: './components/reports/purchase-order-per-periode/index', nav: true, title: 'Rekap Total Pembelian per Unit per Periode' }
    ]);

    this.router = router;
  }
}

      