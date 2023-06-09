export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Subcon Jasa - Barang Jadi' },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Subcon Jasa - Barang Jadi' },
      { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Subcon Jasa - Barang Jadi' },
      { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Subcon Jasa - Barang Jadi' },
      { route: 'excel', moduleId: './excel', name: 'excel', nav: false, title: 'Excel: Subcon Jasa - Barang Jadi' },
    ]);
    this.router = router;
  }
}
