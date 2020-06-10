export class Index {
  configureRouter(config, router) {
      config.map([
          { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List:  Bukti Pembayaran Uang Muka' },
          { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:  Bukti Pembayaran Uang Muka' },
          { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:   Bukti Pembayaran Uang Muka' },
          { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:  Bukti Pembayaran Uang Muka' },
      ]);

      this.router = router;
  }
}
