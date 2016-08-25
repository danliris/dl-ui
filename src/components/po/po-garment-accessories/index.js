export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List PO Garment Sparepart' },
            { route: ['listPODL'], moduleId: './listPODL', name: 'listPODL', nav: false, title: 'List PODL Garment Sparepart' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:PO Garment Sparepart' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:PO Garment Sparepart' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:PO Garment Sparepart' }
        ]);

        this.router = router;
    }
}
