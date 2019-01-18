export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Benang' },
            // { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Benang' },
            // { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Benang' },
            // { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Benang' }
            // { route: 'upload', moduleId: './upload', name: 'upload', nav: false, title: 'Upload: Benang' }
        ]);
    }
}
