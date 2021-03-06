export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Realisasi VB Dengan PO' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Realisasi VB Dengan PO' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Realisasi VB Dengan PO' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Realisasi VB Dengan PO' }
        ]);

        this.router = router;
    }
}
