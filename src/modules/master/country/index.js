export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Country' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:Country' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Country' },
            { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload:Country' }
        ]);

        this.router = router;
    }
}
