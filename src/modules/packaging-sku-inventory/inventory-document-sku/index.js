export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Dokumen Inventory SKU' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Dokumen Inventory SKU' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Dokumen Inventory SKU' }
        ]);
        this.router = router;
    }
}