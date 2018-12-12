export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Surat Perintah Produksi Weaving' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Surat Perintah Produksi Weaving' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Surat Perintah Produksi Weaving' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Surat Perintah Produksi Weaving' }
        ]);

        this.router = router;
    }
}