export class Index {
    configureRouter(config, router) {
      config.map([
        { route: ["", "list"], moduleId: "./list", name: "list", nav: false, title: "List: Stock Beam" },
        { route: "view", moduleId: "./view", name: "view", nav: false, title: "View: Stock Beam" },
        { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Stock Beam' }
      ]);
  
      this.router = router;
    }
  }
  