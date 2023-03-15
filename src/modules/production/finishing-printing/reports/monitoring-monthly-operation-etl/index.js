export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'MONITORING MONTHLY OPERATION MACHINE' },
        ]);

        this.router = router;
    }
}