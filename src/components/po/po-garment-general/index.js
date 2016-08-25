export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List PO Barang Umum' },
            { route: ['listPODL'], moduleId: './listPODL', name: 'listPODL', nav: false, title: 'List PODL Barang Umum' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:PO Barang Umum' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:PO Barang Umum' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:PO Barang Umum' }
        ]);

        this.router = router;
    }
}
