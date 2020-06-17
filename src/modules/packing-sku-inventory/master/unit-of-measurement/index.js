export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Satuan' },
      { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Satuan' },
      { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Satuan' },
      { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Satuan' },
    ]);

    this.router = router;
  }
}
