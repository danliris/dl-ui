export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Penerimaan Packing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Penerimaan Packing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Penerimaan Packing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Penerimaan Packing' }
        ]);

        this.router = router;
    }
}