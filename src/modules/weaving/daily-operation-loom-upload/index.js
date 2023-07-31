export class Index {
    configureRouter(config, router) {
      config.map([
        { route: ["", "list"], moduleId: "./list", name: "list", nav: false, title: "List: Operasional Mesin Harian Loom" },
        { route: "view", moduleId: "./view", name: "view", nav: false, title: "View: Operasional Mesin Harian Loom" },
        { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Operasional Mesin Harian Loom' }
      ]);
  
      this.router = router;
    }
  }
  