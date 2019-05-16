export class Index {
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "list"],
        moduleId: "./list",
        name: "list",
        nav: false,
        title: "List Machine Shift"
      },
      {
        route: "create",
        moduleId: "./create",
        name: "create",
        nav: false,
        title: "Create: Shift Mesin"
      },
      { 
        route: 'edit/:Id', 
        moduleId: './edit', 
        name: 'edit', 
        nav: false, 
        title: 'Edit: Shift Mesin' 
      }
    ]);

    this.router = router;
  }
}
