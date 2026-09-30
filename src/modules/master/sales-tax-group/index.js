export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Sales Tax Group' },
            //{ route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Sales Tax Group' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Sales Tax Group' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload:Sales Tax Group' }
        ]);

        this.router = router;
    }
}
