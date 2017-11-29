export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Style' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Style' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Style' },
        ]);

        this.router = router;
    }
}