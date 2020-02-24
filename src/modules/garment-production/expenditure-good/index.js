export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Barang Jadi' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Barang Jadi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Barang Jadi' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Barang Jadi' },
        ]);
        this.router = router;
    }
}