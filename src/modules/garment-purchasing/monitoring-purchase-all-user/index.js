export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'Monitoring Purchase All User' },
        ]);

        this.router = router;
    }
}
