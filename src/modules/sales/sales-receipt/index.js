export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "List: Kwitansi Penjualan"
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Kwitansi Penjualan"
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: Kwitansi Penjualan"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: true,
        title: "Create: Kwitansi Penjualan"
      }
    ]);
    this.router = router;
  }
}
