export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Master Benang' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Master Benang' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Master Benang' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Master Benang' }
        ]);
    }
}
