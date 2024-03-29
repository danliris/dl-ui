export class Index {
    configureRouter(config, router) {
      config.map([
        {
          route: ["", "list"],
          moduleId: "./list",
          name: "list",
          nav: false,
          title: "List: Estimasi Produksi"
        },
        {
          route: "create",
          moduleId: "./create",
          name: "create",
          nav: false,
          title: "Create: Estimasi Produksi"
        },
        {
          route: "view",
          moduleId: "./view",
          name: "view",
          nav: false,
          title: "View: Estimasi Produksi"
        },
        {
          route: "edit/:Id",
          moduleId: "./edit",
          name: "edit",
          nav: false,
          title: "Edit: Estimasi Produksi"
        },
        {
          route: "upload",
          moduleId: "./upload",
          name: "upload",
          nav: false,
          title: "Upload: Estimasi Produksi"
        }
      ]);
  
      this.router = router;
    }
  }
  