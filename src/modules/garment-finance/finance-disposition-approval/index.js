export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "Daftar"
      },
      {
        route: "view/:dispotitionPurchaseId",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "Detail"
      }
    ]);

    this.router = router;
  }
}
