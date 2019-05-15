export class Index {
  configureRouter(config, router) {
    config.map([{
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Operasional Mesin Harian Sizing"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Operasional Mesin Harian Sizing"
      },
      {
        route: "view/:Id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Operasional Mesin Harian Sizing"
      }
    ]);

    this.router = router;
  }
}
