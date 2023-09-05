export class Index {
    configureRouter(config, router) {
      config.map([
        {
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List: OPERASIONAL MESIN HARIAN SIZING"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: OPERASIONAL MESIN HARIAN SIZING"
        },
        {
          route: "view",
          moduleId: "./view",
          name: "view",
          nav: false,
          title: "View: OPERASIONAL MESIN HARIAN SIZING"
        },
        {
          route: "edit/:Id",
          moduleId: "./edit",
          name: "edit",
          nav: false,
          title: "Edit: OPERASIONAL MESIN HARIAN SIZING"
        },
        {
          route: "upload",
          moduleId: "./upload",
          name: "upload",
          nav: false,
          title: "Upload: OPERASIONAL MESIN HARIAN SIZING"
        }
      ]);
  
      this.router = router;
    }
  }
  