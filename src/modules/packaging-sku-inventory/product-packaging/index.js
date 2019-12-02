export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Product Packaging' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Product Packaging' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Product Packaging' }
        ]);
        this.router = router;
    }
}