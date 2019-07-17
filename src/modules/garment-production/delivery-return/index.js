export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Bukti Pengantar' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Bukti Pengantar' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Bukti Pengantar' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Bukti Pengantar' },
        ]);
        this.router = router;
    }
}