export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List: Visualisasi Pemantauan Beam"
      }
      // {
      //   route: "view/:Id",
      //   moduleId: "./view",
      //   name: "view",
      //   nav: false,
      //   title: "View: Pemantauan Beam"
      // }
    ]);

    this.router = router;
  }
}
