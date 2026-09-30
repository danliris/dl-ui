export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List' },
            { route: 'stelling/:ro', moduleId: './stelling', name: 'stelling', nav: false, title: 'Kartu Stelling' },
            { route: 'edit/:ro', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Mutation' },
        ]);

        this.router = router;
    }
}
