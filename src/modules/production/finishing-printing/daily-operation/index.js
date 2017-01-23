export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:Monitoring Daily Operational setiap Mesin' },
            { route: 'input/:id', moduleId: './edit-input', name: 'input', nav: false, title: 'Edit:Input Monitoring Daily Operational setiap Mesin' },
            { route: 'output/:id', moduleId: './edit-output', name: 'output', nav: false, title: 'Edit:Output Monitoring Daily Operational setiap Mesin' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:Monitoring Daily Operational setiap Mesin' }
        ]);

        this.router = router;
    }
}