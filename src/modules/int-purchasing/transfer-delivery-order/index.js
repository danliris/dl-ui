export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Surat Jalan' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Surat Jalan' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Surat Jalan' }
        ]);

        this.router = router;
    }
}