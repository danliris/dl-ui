export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            // { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Machine Category' },
            { route: 'stelling/:id', moduleId: './stelling', name: 'stelling', nav: false, title: 'Kartu Stelling' },,
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Mutation' },
        ]);

        this.router = router;
    }
}
