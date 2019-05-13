export class Index {
  configureRouter(config, router) {
    config.map([{
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Input Mesin Operasional Harian Sizing"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Input Mesin Operasional Harian Sizing"
      },
      {
        route: "view/:Id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Input Mesin Operasional Harian Sizing"
      }
    ]);

    this.router = router;
  }
}
