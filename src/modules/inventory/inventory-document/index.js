export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List:  Dokumen Inventaris' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:  Dokumen Inventoris' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:   Dokumen Inventoris' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:  Dokumen Inventoris' },
        ]);

        this.router = router;
    }
}
