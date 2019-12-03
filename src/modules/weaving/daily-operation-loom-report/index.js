export class Index {
  configureRouter(config, router) {
    config.map([{
        route: ['', 'list'],
        moduleId: './list',
        name: 'list',
        nav: true,
        title: 'List : Laporan Operasional Mesin Harian Loom'
      },
      {
        route: "detail/:Id",
        moduleId: "./detail",
        name: "detail",
        nav: false,
        title: "Detail: Detail Operasional Mesin Harian Loom"
      }
    ]);

    this.router = router;
  }
}
