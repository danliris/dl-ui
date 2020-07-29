export class Index {
  configureRouter(config, router) {
      config.map([
          { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Realisasi VB Non PO' },
          { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Realisasi VB Non PO' },
          { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Realisasi VB Non PO' },
          { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Realisasi VB Non PO' },
      ]);

      this.router = router;
  }
}
