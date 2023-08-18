export class Index {
  configureRouter(config, router) {
    config.map([{
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List Operasional Mesin Harian Warping"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Operasional Mesin Harian Warping"
      },
      {
        route: "update/:Id",
        moduleId: "./update",
        name: "update",
        nav: false,
        title: "Update: Operasional Mesin Harian Warping"
      },
      { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload:Unit' },
      { route: "view/", moduleId: "./view", name: "view", nav: false, title: "Detail: Operasional Mesin Harian Warping" },
    ]);

    this.router = router;
  }
}
