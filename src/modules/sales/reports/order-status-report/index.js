export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'detail/:tahun/:bulan', moduleId: './detail', name: 'detail', nav: false, title: 'View:Detail' }

        ]);

        this.router = router;
    }
}