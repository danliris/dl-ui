export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Signature' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Signature' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Signature' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Signature' },
        ]);

        this.router = router;
    }
}