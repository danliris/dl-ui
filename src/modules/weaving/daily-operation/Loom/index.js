export class Index {
    configureRouter(config, router) {
      config.map([
        {
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List Operasional Loom"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Operasional Loom"
        },
        {
          route: "update/:Id",
          moduleId: "./update",
          name: "update",
          nav: false,
          title: "update: Operasional Loom"
        }
      ]);
  
      this.router = router;
    }
  }
  