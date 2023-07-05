export class Index {
    configureRouter(config, router) {
      config.map([{
        route: ['', 'list'],
        moduleId: './list',
        name: 'list',
        nav: true,
        title: 'List : LAPORAN SPU'
      }, ]);
  
      this.router = router;
    }
  }
  