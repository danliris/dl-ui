export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List PO Master Fabric' },
            { route: ['listPODL'], moduleId: './listPODL', name: 'listPODL', nav: false, title: 'List PODL Master Fabric' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:PO Master Fabric' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:PO Master Fabric' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:PO Master Fabric' }
        ]);

        this.router = router;
    }
}
