export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Booking' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Booking' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View: Booking' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Booking' },
        ]);

        this.router = router;
    }
}