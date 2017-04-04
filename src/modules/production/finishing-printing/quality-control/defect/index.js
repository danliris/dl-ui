export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'create'], moduleId: './create', name: 'create', nav: true, title: 'Create' } 
        ]);
        this.router = router;
    }
}
