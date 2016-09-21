export class Index {
    configureRouter(config, router) {
         config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List PO Job Order Fabric' },
            { route: ['list-podl'], moduleId: './list-podl', name: 'list-podl', nav: false, title: 'List PODL Job Order Fabric' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:PO Job Order Fabric' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:PO Job Order Fabric' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:PO Job Order Fabric' },
            { route: 'create-podl', moduleId: './create-podl', name: 'create-podl', nav: false, title: 'Create:PODL Job Order Fabric' }
        ]);
        
        this.router = router;
    }
}