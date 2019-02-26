export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: true,
        title: "List: Master Asal Benang"
      },
      {
        route: "view/:id",
        moduleId: "./view",
        name: "view",
        nav: false,
        title: "View: Master Asal Benang"
      },
      {
        route: "edit/:id",
        moduleId: "./edit",
        name: "edit",
        nav: false,
        title: "Edit: Master Asal Benang"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Master Asal Benang"
      }
    ]);
  }
}
