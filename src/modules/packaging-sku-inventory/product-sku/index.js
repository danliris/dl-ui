export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Product SKU' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Product SKU' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Product SKU' }
        ]);
        this.router = router;
    }
}