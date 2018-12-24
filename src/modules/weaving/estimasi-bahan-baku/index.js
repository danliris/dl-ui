export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "editable-list"],
        moduleId: "./editable-list",
        name: "editable-list",
        nav: false,
        title: "Estimasi Permintaan Bahan Baku"
      }
      // { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Buat Permintaan Bahan Baku' },
      // { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Buat Permintaan Bahan Baku' },
      // { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Buat Permintaan Bahan Baku' }
    ]);

    this.router = router;
  }
}
