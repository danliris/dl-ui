export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'form-controls'], moduleId: './form-controls', name: 'form-controls', nav: true, title: 'Sample - Form Controls' }
        ]);

        this.router = router;
    }
}
