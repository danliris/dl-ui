export class Index {
    configureRouter(config, router) {
      config.map([
        { route: ["", "list"], moduleId: "./list", name: "list", nav: false, title: "List: Operasional Mesin Harian Reaching" },
        { route: "view", moduleId: "./view", name: "view", nav: false, title: "View: Operasional Mesin Harian Reaching" },
        { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Operasional Mesin Harian Reaching' }
      ]);
  
      this.router = router;
    }
  }
  