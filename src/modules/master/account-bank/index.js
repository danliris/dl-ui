export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Rekening Bank' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Rekening Bank' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Rekening Bank' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Rekening Bank' },
        ]);

        this.router = router;
    }
}
