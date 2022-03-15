export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list', 'index'], moduleId: './list', name: 'list', nav: false, title: 'List: PPN ' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: PPN' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: PPN' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: PPN' },
            
        ]);

        this.router = router;
    }
}
