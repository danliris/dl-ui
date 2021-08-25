export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Saldo Hutang Lokal Valas' },
            { route: ['detail'], moduleId: './detai;', name: 'detail', nav: true, title: 'Rincian Saldo Hutang' },
        ]);

        this.router = router;
    }
}
