export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Kanban Pengganti Bad Output' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Kanban Pengganti Bad Output' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Kanban Pengganti Bad Output' },
            { route: 'reprocess', moduleId: './reprocess', name: 'reprocess', nav: false, title: 'Reprocess:Kanban Pengganti Bad Output' }
        ]);

        this.router = router;
    }
}
