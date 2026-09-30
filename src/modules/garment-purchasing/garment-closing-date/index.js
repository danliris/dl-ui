export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Close Date' },
        ]);

        this.router = router;
    }
}
