export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "List: Faktur Penjualan",
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Faktur Penjualan",
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: Faktur Penjualan",
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: true,
        title: "Create: Faktur Penjualan",
      },
    ]);
    this.router = router;
  }
}
