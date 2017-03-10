export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Sales Contract - Spinning' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Sales Contract - Spinning' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Sales Contract - Spinning' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Sales Contract - Spinning' },
        ]);

        this.router = router;
    }
}