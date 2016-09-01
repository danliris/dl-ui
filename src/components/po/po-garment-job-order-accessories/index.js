export class Index {
    configureRouter(config, router) {
         config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List PO Job Order Aksesoris' },
            { route: ['list-podl'], moduleId: './list-podl', name: 'list-podl', nav: false, title: 'List PODL Job Order Aksesoris' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:PO Job Order Aksesoris' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:PO Job Order Aksesoris' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:PO Job Order Aksesoris' },
            { route: 'create-podl', moduleId: './create-podl', name: 'create-podl', nav: false, title: 'Create:PODL Job Order Aksesoris' }
        ]);
        
        this.router = router;
    }
}