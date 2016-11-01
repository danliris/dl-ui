export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List Internal PO Tekstil' },
            { route: ['list-podl'], moduleId: './list-podl', name: 'list-podl', nav: false, title: 'List Eksternal PO Tekstil' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Internal PO Tekstil' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Internal PO Tekstil' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Internal PO Tekstil' },
            { route: 'create-podl', moduleId: './create-podl', name: 'create-podl', nav: false, title: 'Create:Eksternal PO Tekstil' },
            { route: 'view-podl/:id', moduleId: './view-podl', name: 'view-podl', nav: false, title: 'View:Eksternal PO Tekstil' },
            { route: 'edit-podl/:id', moduleId: './edit-podl', name: 'edit-podl', nav: false, title: 'Edit:Eksternal PO Tekstil' },
        ]);

        this.router = router;
    }
}