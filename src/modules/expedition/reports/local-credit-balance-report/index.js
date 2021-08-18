export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Saldo Hutang' },
            { route: ['detail'], moduleId: './detail', name: 'detail', nav: true, title: 'Rincian Saldo Hutang' },
        ]);

        this.router = router;
    }
}
