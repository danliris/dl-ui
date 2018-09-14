export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List:  Transaksi Bank Harian' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:  Transaksi Bank Harian' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:   Transaksi Bank Harian' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:  Transaksi Bank Harian' },
        ]);

        this.router = router;
    }
}
