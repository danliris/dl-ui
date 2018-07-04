export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Kapasitas Produksi' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Kapasitas Produksi' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Kapasitas Produksi' },
        ]);

        this.router = router;
    }
}