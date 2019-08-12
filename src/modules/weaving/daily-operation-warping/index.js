export class Index {
    configureRouter(config, router) {
      config.map([
        {
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
        }
        ,
        // {
        //   route: "view/:Id",
        //   moduleId: "./view",
        //   name: "view",
        //   nav: false,
        //   title: "view: Operasional Mesin Harian Warping"
        // }
      ]);
  
      this.router = router;
    }
  }
  