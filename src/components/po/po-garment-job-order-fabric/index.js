export class Index {
    configureRouter(config, router) {
         config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List PO Tekstil Eksternal' },
            { route: ['listPODL'], moduleId: './listPODL', name: 'listPODL', nav: false, title: 'List PODL Tekstil Eksternal' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:PO Tekstil Eksternal' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit:PO Tekstil Eksternal' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create:PO Tekstil Eksternal' }
        ]);
    }
}