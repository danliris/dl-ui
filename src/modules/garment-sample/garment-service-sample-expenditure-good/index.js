export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Sample Jasa - Barang Jadi' },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Sample Jasa - Barang Jadi' },
      { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Sample Jasa - Barang Jadi' },
      { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Sample Jasa - Barang Jadi' },
      { route: 'excel', moduleId: './excel', name: 'excel', nav: false, title: 'Excel: Sample Jasa - Barang Jadi' },
    ]);
    this.router = router;
  }
}
