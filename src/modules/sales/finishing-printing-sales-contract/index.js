export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Sales Contract - Finishing & Printing' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Sales Contract - Finishing & Printing' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Sales Contract - Finishing & Printing' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Sales Contract - Finishing & Printing' },
        ]);

        this.router = router;
    }
}