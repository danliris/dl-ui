export class Index {
    configureRouter(config, router) {
      config.map([{
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List Dokumen Inventori Aval"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Dokumen Inventori Aval"
        },
        {
          route: 'view/:Id',
          moduleId: './view',
          name: 'view',
          nav: false,
          title: 'View: Dokumen Inventori Aval'
        },
        {
          route: 'edit/:Id',
          moduleId: './edit',
          name: 'edit',
          nav: false,
          title: 'Edit: Dokumen Inventori Aval'
        }
      ]);
  
      this.router = router;
    }
  }
  