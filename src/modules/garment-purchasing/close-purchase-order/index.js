export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Close Purchase Order Garment' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Close Purchase Order Garment' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Close Purchase Order Garment' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Close Purchase Order Garment' }
        ]);

        this.router = router;
    }
}