export class App {
  configureRouter(config, router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome', moduleId: './welcome', nav: true, title: 'Welcome' },
      // { route: 'users',         name: 'users',        moduleId: './users',        nav: true, title: 'Github Users' },
      // { route: 'child-router',  name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' },
      // { route: 'products',      name: 'products',     moduleId: './components/product/index',        nav: true, title: 'Products' },
      { route: 'fabrics', name: 'fabrics', moduleId: './components/fabric/index', nav: true, title: 'Fabrics' },
      { route: 'buyers', name: 'buyers', moduleId: './components/buyer/index', nav: true, title: 'Buyers' },
      { route: 'suppliers', name: 'suppliers', moduleId: './components/supplier/index', nav: true, title: 'Suppliers' },
      { route: 'textiles', name: 'textiles', moduleId: './components/textile/index', nav: true, title: 'Textiles' },
      { route: 'accessories', name: 'accessories', moduleId: './components/accessories/index', nav: true, title: 'Accessories' },
      { route: 'generalmerchandises', name: 'generalmerchandises', moduleId: './components/general-merchandise/index', nav: true, title: 'General Merchandises' },
      { route: 'uoms', name: 'uoms', moduleId: './components/UoM/index', nav: true, title: 'Unit of Measurements' },
      { route: 'spareparts', name: 'spareparts', moduleId: './components/sparepart/index', nav: true, title: 'Spareparts' },
      { route: 'garmentspareparts', name: 'garmentspareparts', moduleId: './components/po/po-garment-sparepart/index', nav: true, title: 'Garment Sparepart' }

    ]);

    this.router = router;
  }
}
