export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Dokumen Inventory Packaging' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Dokumen Inventory Packaging' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Dokumen Inventory Packaging' }
        ]);
        this.router = router;
    }
}